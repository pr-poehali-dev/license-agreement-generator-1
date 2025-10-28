import json
import os
from typing import Dict, Any
import psycopg2
from datetime import datetime
import requests

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send scheduled reminders to users via Telegram
    Args: event - cron trigger or manual call
          context - cloud function context
    Returns: HTTP response with sent reminders count
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    try:
        db_url = os.environ.get('DATABASE_URL', '')
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        now = datetime.now()
        current_time = now.strftime('%H:%M')
        current_day = now.isoweekday()
        
        cur.execute('''
            SELECT id, user_id, title, description, reminder_time
            FROM reminders
            WHERE is_active = TRUE
              AND reminder_time::text = %s
              AND %s = ANY(days_of_week)
        ''', (current_time, current_day))
        
        reminders = cur.fetchall()
        sent_count = 0
        
        for reminder in reminders:
            rid, user_id, title, description, rem_time = reminder
            
            text = f'🔔 *Напоминание*\n\n{title}'
            if description:
                text += f'\n\n_{description}_'
            
            keyboard = {
                'inline_keyboard': [
                    [{'text': '✅ Готово', 'callback_data': f'done_{rid}'}],
                    [{'text': '⏰ Напомнить позже', 'callback_data': f'snooze_{rid}'}]
                ]
            }
            
            send_message(user_id, text, telegram_token, keyboard)
            sent_count += 1
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'success': True,
                'sent_count': sent_count,
                'current_time': current_time,
                'current_day': current_day
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'success': False,
                'error': str(e)
            })
        }


def send_message(chat_id: int, text: str, token: str, keyboard: Dict = None):
    '''Отправить сообщение в Telegram'''
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    
    data = {
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown'
    }
    
    if keyboard:
        data['reply_markup'] = json.dumps(keyboard)
    
    try:
        response = requests.post(url, json=data)
        return response.status_code == 200
    except Exception:
        return False
