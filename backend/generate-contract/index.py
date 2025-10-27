import json
import os
import io
from typing import Dict, Any
from docx import Document
import psycopg2
import requests

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generate license agreement DOCX from template and send to Telegram
    Args: event - dict with httpMethod, body containing form data
          context - object with request_id attribute
    Returns: HTTP response dict with success/error status
    '''
    method: str = event.get('httpMethod', 'GET')
    
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
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        db_url = os.environ.get('DATABASE_URL')
        if not db_url:
            raise Exception('DATABASE_URL not found')
        
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        cur.execute('UPDATE contract_counter SET current_number = current_number + 1, updated_at = CURRENT_TIMESTAMP WHERE id = 1 RETURNING current_number')
        result = cur.fetchone()
        contract_number = result[0] if result else 1
        
        conn.commit()
        
        cur.execute('SELECT template_data FROM template_storage WHERE id = 1')
        template_result = cur.fetchone()
        
        cur.close()
        conn.close()
        
        if not template_result or not template_result[0]:
            raise Exception('Template not found. Please upload template.docx first via /434 page')
        
        template_bytes = bytes(template_result[0])
        template_io = io.BytesIO(template_bytes)
        
        replacements = {
            '{{номер_договора}}': str(contract_number),
            '{{дата_заключения_договора}}': body_data.get('дата_заключения_договора', ''),
            '{{graj}}': body_data.get('graj', ''),
            '{{ФИО_ИП_полностью_кого}}': body_data.get('ФИО_ИП_полностью_кого', ''),
            '{{ФИО_ИП_кратко}}': body_data.get('ФИО_ИП_кратко', ''),
            '{{NIK}}': body_data.get('NIK', ''),
            '{{PAS}}': body_data.get('PAS', ''),
            '{{mail}}': body_data.get('mail', ''),
            '{{ИНН_SWIFT}}': body_data.get('ИНН_SWIFT', ''),
            '{{РЕКВИЗИТЫ_БАНК}}': body_data.get('РЕКВИЗИТЫ_БАНК', '')
        }
        
        doc = Document(template_io)
        
        for paragraph in doc.paragraphs:
            for key, value in replacements.items():
                if key in paragraph.text:
                    for run in paragraph.runs:
                        run.text = run.text.replace(key, value)
        
        for table in doc.tables:
            for row in table.rows:
                for cell in row.cells:
                    for paragraph in cell.paragraphs:
                        for key, value in replacements.items():
                            if key in paragraph.text:
                                for run in paragraph.runs:
                                    run.text = run.text.replace(key, value)
        
        for section in doc.sections:
            header = section.header
            for paragraph in header.paragraphs:
                for key, value in replacements.items():
                    if key in paragraph.text:
                        for run in paragraph.runs:
                            run.text = run.text.replace(key, value)
            
            footer = section.footer
            for paragraph in footer.paragraphs:
                for key, value in replacements.items():
                    if key in paragraph.text:
                        for run in paragraph.runs:
                            run.text = run.text.replace(key, value)
        
        output = io.BytesIO()
        doc.save(output)
        output.seek(0)
        
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
        
        nickname = body_data.get('NIK', 'Unknown')
        
        cover_image_b64 = body_data.get('cover_image', '')
        if cover_image_b64:
            import base64
            cover_image_bytes = base64.b64decode(cover_image_b64)
            cover_image_name = body_data.get('cover_image_name', 'cover.jpg')
            
            photo_files = {'photo': (cover_image_name, io.BytesIO(cover_image_bytes))}
            photo_data = {
                'chat_id': chat_id,
                'caption': f'🎨 Обложка для {nickname}'
            }
            photo_url = f'https://api.telegram.org/bot{telegram_token}/sendPhoto'
            photo_response = requests.post(photo_url, files=photo_files, data=photo_data)
            
            if photo_response.status_code != 200:
                raise Exception(f'Telegram photo error: {photo_response.text}')
        
        files = {
            'document': (f'{nickname}_Договор_{contract_number}.docx', output, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        }
        data = {
            'chat_id': chat_id,
            'caption': f'🎵 {nickname} - Лицензионный договор №{contract_number}'
        }
        
        telegram_url = f'https://api.telegram.org/bot{telegram_token}/sendDocument'
        response = requests.post(telegram_url, files=files, data=data)
        
        if response.status_code != 200:
            raise Exception(f'Telegram API error: {response.text}')
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'contract_number': contract_number,
                'message': 'Договор успешно сгенерирован и отправлен в Telegram'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': False,
                'error': str(e)
            })
        }