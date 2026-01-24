import json
import os
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    """Отправка уведомлений о заявках в Telegram"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Получаем данные из запроса
    try:
        body = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Invalid JSON'})
        }
    
    # Получаем токен и chat_id из переменных окружения
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Telegram credentials not configured'})
        }
    
    # Формируем сообщение в зависимости от типа формы
    form_type = body.get('formType', 'unknown')
    
    if form_type == 'booking':
        message = format_booking_message(body)
    elif form_type == 'partner':
        message = format_partner_message(body)
    else:
        message = format_generic_message(body)
    
    # Отправляем сообщение в Telegram
    try:
        send_telegram_message(bot_token, chat_id, message)
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Failed to send message: {str(e)}'})
        }


def format_booking_message(data: dict) -> str:
    """Форматирование сообщения для заявки на бронирование"""
    lines = [
        '🚗 <b>НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ</b>',
        '',
        f'📍 <b>Город выдачи:</b> {data.get("pickupCity", "—")}',
    ]
    
    if data.get('returnDifferentCity'):
        lines.append(f'📍 <b>Город возврата:</b> {data.get("returnCity", "—")}')
    
    lines.extend([
        f'📅 <b>Период:</b> {data.get("dateRange", "—")}',
        f'🛣 <b>Пробег:</b> {data.get("mileage", "—")} км',
    ])
    
    # Дополнительные опции
    options = []
    if data.get('childSeats'):
        options.append('👶 Детские кресла')
    if data.get('transponder'):
        options.append('🚦 Транспондер')
    if data.get('roofBox'):
        options.append('📦 Автобокс')
    if data.get('fridge'):
        options.append('❄️ Холодильник')
    if data.get('delivery'):
        options.append('🚚 Доставка авто')
    if data.get('abroad'):
        options.append('🌍 Выезд за границу')
    
    if options:
        lines.append('')
        lines.append('<b>Опции:</b>')
        lines.extend(options)
    
    return '\n'.join(lines)


def format_partner_message(data: dict) -> str:
    """Форматирование сообщения для заявки партнёра"""
    lines = [
        '🤝 <b>НОВАЯ ЗАЯВКА ОТ ПАРТНЁРА</b>',
        '',
        f'👤 <b>Имя:</b> {data.get("name", "—")}',
        f'📱 <b>Телефон:</b> {data.get("phone", "—")}',
        f'🚗 <b>Автомобиль:</b> {data.get("car", "—")}',
        f'📅 <b>Год выпуска:</b> {data.get("year", "—")}',
    ]
    
    if data.get('message'):
        lines.extend([
            '',
            '<b>Дополнительная информация:</b>',
            data.get('message', '—')
        ])
    
    return '\n'.join(lines)


def format_generic_message(data: dict) -> str:
    """Форматирование общего сообщения"""
    lines = ['📝 <b>НОВАЯ ЗАЯВКА</b>', '']
    
    for key, value in data.items():
        if key != 'formType' and value:
            lines.append(f'<b>{key}:</b> {value}')
    
    return '\n'.join(lines)


def send_telegram_message(bot_token: str, chat_id: str, message: str):
    """Отправка сообщения в Telegram через HTTP API"""
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    
    payload = {
        'chat_id': chat_id,
        'text': message,
        'parse_mode': 'HTML'
    }
    
    data = urllib.parse.urlencode(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data)
    
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        if not result.get('ok'):
            raise Exception(f"Telegram API error: {result}")
