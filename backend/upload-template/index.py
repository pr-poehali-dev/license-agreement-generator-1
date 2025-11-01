import json
import os
import base64
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Upload template.docx file to backend storage
    Args: event - dict with httpMethod, body with file data
          context - object with request_id attribute
    Returns: HTTP response with success/error status
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
        body = event.get('body', '')
        is_base64 = event.get('isBase64Encoded', False)
        
        if not body:
            raise Exception('No file data provided')
        
        # Cloud Functions всегда передают бинарные данные как base64 строку
        if isinstance(body, str):
            file_content = base64.b64decode(body)
        else:
            file_content = body
        
        file_size = len(file_content)
        
        if file_size < 100:
            raise Exception(f'File too small ({file_size} bytes), likely corrupt')
        
        # Проверка что это действительно DOCX (ZIP файл)
        if not file_content.startswith(b'PK'):
            raise Exception(f'Invalid DOCX file format. First bytes: {file_content[:4].hex()}')
        
        db_url = os.environ.get('DATABASE_URL')
        if not db_url:
            raise Exception('DATABASE_URL not found')
        
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        cur.execute(
            'UPDATE template_storage SET template_data = %s, filename = %s, file_size = %s, uploaded_at = CURRENT_TIMESTAMP WHERE id = 1',
            (psycopg2.Binary(file_content), 'template.docx', file_size)
        )
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'message': 'Template uploaded successfully',
                'file_size': file_size
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