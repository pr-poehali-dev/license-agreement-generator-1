import json
import os
from typing import Dict, Any, List
import psycopg2
from datetime import datetime, time

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Telegram bot for contract delivery and reminders management
    Args: event - webhook from Telegram with updates
          context - cloud function context
    Returns: HTTP response for Telegram
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        if 'message' not in body_data and 'callback_query' not in body_data:
            return {'statusCode': 200, 'body': json.dumps({'ok': True})}
        
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        db_url = os.environ.get('DATABASE_URL', '')
        
        if 'callback_query' in body_data:
            return handle_callback_query(body_data['callback_query'], telegram_token, db_url)
        
        message = body_data.get('message', {})
        chat_id = message.get('chat', {}).get('id')
        text = message.get('text', '')
        user_id = message.get('from', {}).get('id')
        
        if text.startswith('/start'):
            send_main_menu(chat_id, telegram_token)
        elif text.startswith('/menu'):
            send_main_menu(chat_id, telegram_token)
        elif text.startswith('/reminders'):
            show_reminders_list(chat_id, user_id, telegram_token, db_url)
        else:
            send_message(chat_id, 'Используй /menu для вызова главного меню', telegram_token)
        
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'ok': True})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }


def send_main_menu(chat_id: int, token: str):
    '''Отправка главного меню с кнопками'''
    keyboard = {
        'inline_keyboard': [
            [{'text': '📋 Мои напоминания', 'callback_data': 'list_reminders'}],
            [{'text': '➕ Создать напоминание', 'callback_data': 'create_reminder'}],
            [{'text': '🔔 О боте', 'callback_data': 'about'}]
        ]
    }
    
    send_message(
        chat_id,
        '🤖 *Главное меню*\n\nВыбери действие:',
        token,
        keyboard
    )


def show_reminders_list(chat_id: int, user_id: int, token: str, db_url: str):
    '''Показать список всех напоминаний пользователя'''
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    cur.execute('''
        SELECT id, title, reminder_time, days_of_week, is_active 
        FROM reminders 
        WHERE user_id = %s 
        ORDER BY reminder_time
    ''', (user_id,))
    
    reminders = cur.fetchall()
    cur.close()
    conn.close()
    
    if not reminders:
        keyboard = {
            'inline_keyboard': [
                [{'text': '➕ Создать первое напоминание', 'callback_data': 'create_reminder'}],
                [{'text': '« Назад', 'callback_data': 'main_menu'}]
            ]
        }
        send_message(chat_id, '📋 У тебя пока нет напоминаний', token, keyboard)
        return
    
    days_names = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    
    text = '📋 *Твои напоминания:*\n\n'
    keyboard_buttons = []
    
    for reminder in reminders:
        rid, title, rem_time, days, is_active = reminder
        status = '✅' if is_active else '❌'
        days_str = ', '.join([days_names[d-1] for d in sorted(days)])
        
        text += f'{status} *{title}*\n'
        text += f'   ⏰ {rem_time.strftime("%H:%M")}\n'
        text += f'   📅 {days_str}\n\n'
        
        keyboard_buttons.append([{
            'text': f'{"✏️" if is_active else "🔄"} {title}',
            'callback_data': f'edit_reminder_{rid}'
        }])
    
    keyboard_buttons.append([{'text': '➕ Создать новое', 'callback_data': 'create_reminder'}])
    keyboard_buttons.append([{'text': '« Назад', 'callback_data': 'main_menu'}])
    
    keyboard = {'inline_keyboard': keyboard_buttons}
    send_message(chat_id, text, token, keyboard)


def handle_callback_query(callback: Dict, token: str, db_url: str) -> Dict[str, Any]:
    '''Обработка нажатий на кнопки'''
    callback_id = callback.get('id')
    chat_id = callback.get('message', {}).get('chat', {}).get('id')
    user_id = callback.get('from', {}).get('id')
    data = callback.get('data', '')
    
    answer_callback(callback_id, token)
    
    if data == 'main_menu':
        send_main_menu(chat_id, token)
    
    elif data == 'list_reminders':
        show_reminders_list(chat_id, user_id, token, db_url)
    
    elif data == 'create_reminder':
        show_create_reminder_templates(chat_id, token)
    
    elif data == 'about':
        text = (
            '🤖 *О боте*\n\n'
            'Этот бот помогает:\n'
            '• Получать готовые договора\n'
            '• Управлять напоминаниями\n'
            '• Настраивать уведомления на каждый день\n\n'
            'Создавай напоминания и получай их в нужное время!'
        )
        keyboard = {'inline_keyboard': [[{'text': '« Назад', 'callback_data': 'main_menu'}]]}
        send_message(chat_id, text, token, keyboard)
    
    elif data.startswith('template_'):
        template_name = data.replace('template_', '')
        create_reminder_from_template(chat_id, user_id, template_name, token, db_url)
    
    elif data.startswith('edit_reminder_'):
        reminder_id = int(data.replace('edit_reminder_', ''))
        show_reminder_editor(chat_id, reminder_id, token, db_url)
    
    elif data.startswith('toggle_'):
        reminder_id = int(data.replace('toggle_', ''))
        toggle_reminder(reminder_id, db_url)
        show_reminder_editor(chat_id, reminder_id, token, db_url)
    
    elif data.startswith('delete_'):
        reminder_id = int(data.replace('delete_', ''))
        delete_reminder(reminder_id, db_url)
        send_message(chat_id, '✅ Напоминание удалено', token)
        show_reminders_list(chat_id, user_id, token, db_url)
    
    elif data.startswith('duplicate_'):
        reminder_id = int(data.replace('duplicate_', ''))
        duplicate_reminder(reminder_id, db_url)
        send_message(chat_id, '✅ Напоминание продублировано', token)
        show_reminders_list(chat_id, user_id, token, db_url)
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }


def show_create_reminder_templates(chat_id: int, token: str):
    '''Показать шаблоны для быстрого создания напоминаний'''
    keyboard = {
        'inline_keyboard': [
            [{'text': '💧 Попей воды', 'callback_data': 'template_water'}],
            [{'text': '💊 Выпей таблетку', 'callback_data': 'template_pill'}],
            [{'text': '📖 Почитай книгу', 'callback_data': 'template_read'}],
            [{'text': '💪 Отожмись', 'callback_data': 'template_pushups'}],
            [{'text': '🧘 Медитация', 'callback_data': 'template_meditation'}],
            [{'text': '🚶 Прогулка', 'callback_data': 'template_walk'}],
            [{'text': '« Назад', 'callback_data': 'main_menu'}]
        ]
    }
    
    send_message(
        chat_id,
        '➕ *Создать напоминание*\n\nВыбери шаблон или создай свое:',
        token,
        keyboard
    )


def create_reminder_from_template(chat_id: int, user_id: int, template: str, token: str, db_url: str):
    '''Создать напоминание из шаблона'''
    templates = {
        'water': ('💧 Попей воды', 'Выпей стакан воды для здоровья', '10:00'),
        'pill': ('💊 Выпей таблетку', 'Не забудь принять лекарство', '09:00'),
        'read': ('📖 Почитай книгу', 'Уделить время чтению', '20:00'),
        'pushups': ('💪 Отожмись', 'Сделай 20 отжиманий', '08:00'),
        'meditation': ('🧘 Медитация', '10 минут медитации', '07:00'),
        'walk': ('🚶 Прогулка', 'Прогуляться на свежем воздухе', '18:00')
    }
    
    if template not in templates:
        return
    
    title, description, default_time = templates[template]
    
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    cur.execute('''
        INSERT INTO reminders (user_id, title, description, reminder_time, days_of_week, is_active)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id
    ''', (user_id, title, description, default_time, [1,2,3,4,5,6,7], True))
    
    reminder_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    
    send_message(chat_id, f'✅ Напоминание "{title}" создано на {default_time} каждый день', token)
    show_reminder_editor(chat_id, reminder_id, token, db_url)


def show_reminder_editor(chat_id: int, reminder_id: int, token: str, db_url: str):
    '''Показать редактор напоминания'''
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    cur.execute('''
        SELECT title, description, reminder_time, days_of_week, is_active 
        FROM reminders 
        WHERE id = %s
    ''', (reminder_id,))
    
    result = cur.fetchone()
    cur.close()
    conn.close()
    
    if not result:
        send_message(chat_id, '❌ Напоминание не найдено', token)
        return
    
    title, description, rem_time, days, is_active = result
    
    days_names = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    days_str = ', '.join([days_names[d-1] for d in sorted(days)])
    status = '✅ Активно' if is_active else '❌ Выключено'
    
    text = (
        f'✏️ *Редактор напоминания*\n\n'
        f'*{title}*\n'
        f'{description}\n\n'
        f'⏰ Время: {rem_time.strftime("%H:%M")}\n'
        f'📅 Дни: {days_str}\n'
        f'Статус: {status}'
    )
    
    toggle_text = '🔴 Выключить' if is_active else '🟢 Включить'
    
    keyboard = {
        'inline_keyboard': [
            [{'text': toggle_text, 'callback_data': f'toggle_{reminder_id}'}],
            [{'text': '📋 Дублировать', 'callback_data': f'duplicate_{reminder_id}'}],
            [{'text': '🗑 Удалить', 'callback_data': f'delete_{reminder_id}'}],
            [{'text': '« К списку', 'callback_data': 'list_reminders'}]
        ]
    }
    
    send_message(chat_id, text, token, keyboard)


def toggle_reminder(reminder_id: int, db_url: str):
    '''Переключить активность напоминания'''
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    cur.execute('''
        UPDATE reminders 
        SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
    ''', (reminder_id,))
    
    conn.commit()
    cur.close()
    conn.close()


def delete_reminder(reminder_id: int, db_url: str):
    '''Удалить напоминание'''
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    cur.execute('DELETE FROM reminders WHERE id = %s', (reminder_id,))
    
    conn.commit()
    cur.close()
    conn.close()


def duplicate_reminder(reminder_id: int, db_url: str):
    '''Дублировать напоминание'''
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    cur.execute('''
        INSERT INTO reminders (user_id, title, description, reminder_time, days_of_week, is_active)
        SELECT user_id, title || ' (копия)', description, reminder_time, days_of_week, is_active
        FROM reminders
        WHERE id = %s
    ''', (reminder_id,))
    
    conn.commit()
    cur.close()
    conn.close()


def send_message(chat_id: int, text: str, token: str, keyboard: Dict = None):
    '''Отправить сообщение в Telegram'''
    import requests
    
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    
    data = {
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown'
    }
    
    if keyboard:
        data['reply_markup'] = json.dumps(keyboard)
    
    requests.post(url, json=data)


def answer_callback(callback_id: str, token: str):
    '''Ответить на callback query'''
    import requests
    
    url = f'https://api.telegram.org/bot{token}/answerCallbackQuery'
    requests.post(url, json={'callback_query_id': callback_id})
