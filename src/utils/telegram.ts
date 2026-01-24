const TELEGRAM_BOT_TOKEN = '8068156949:AAFSgJvGDZdtlhFTaLo-oEUoqyBh8gq9Ulw';
const TELEGRAM_CHAT_ID = '7984623084';

interface BookingData {
  formType: 'booking';
  pickupCity: string;
  returnDifferentCity: boolean;
  returnCity?: string;
  dateRange: string;
  mileage: string;
  childSeats: boolean;
  transponder: boolean;
  roofBox: boolean;
  fridge: boolean;
  delivery: boolean;
  abroad: boolean;
}

interface PartnerData {
  formType: 'partner';
  name: string;
  phone: string;
  car: string;
  year: string;
  message?: string;
}

type FormData = BookingData | PartnerData;

function formatBookingMessage(data: BookingData): string {
  let message = `🚗 <b>НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ</b>\n\n`;
  message += `📍 <b>Город выдачи:</b> ${data.pickupCity}\n`;
  
  if (data.returnDifferentCity && data.returnCity) {
    message += `📍 <b>Город возврата:</b> ${data.returnCity}\n`;
  }
  
  message += `📅 <b>Период:</b> ${data.dateRange}\n`;
  message += `🛣 <b>Пробег:</b> ${data.mileage} км\n`;
  
  const options: string[] = [];
  if (data.childSeats) options.push('👶 Детские кресла');
  if (data.transponder) options.push('🚦 Транспондер');
  if (data.roofBox) options.push('📦 Автобокс');
  if (data.fridge) options.push('❄️ Холодильник');
  if (data.delivery) options.push('🚚 Доставка авто');
  if (data.abroad) options.push('🌍 Выезд за границу');
  
  if (options.length > 0) {
    message += `\n<b>Опции:</b>\n${options.join('\n')}`;
  }
  
  return message;
}

function formatPartnerMessage(data: PartnerData): string {
  let message = `🤝 <b>НОВАЯ ЗАЯВКА ОТ ПАРТНЁРА</b>\n\n`;
  message += `👤 <b>Имя:</b> ${data.name}\n`;
  message += `📱 <b>Телефон:</b> ${data.phone}\n`;
  message += `🚗 <b>Автомобиль:</b> ${data.car}\n`;
  message += `📅 <b>Год выпуска:</b> ${data.year}\n`;
  
  if (data.message) {
    message += `\n<b>Дополнительная информация:</b>\n${data.message}`;
  }
  
  return message;
}

export async function sendToTelegram(data: FormData): Promise<void> {
  const message = data.formType === 'booking' 
    ? formatBookingMessage(data) 
    : formatPartnerMessage(data);
  
  const params = new URLSearchParams({
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: 'HTML',
  });
  
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?${params}`;
  
  const response = await fetch(telegramUrl, {
    method: 'GET',
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Telegram API error: ${JSON.stringify(error)}`);
  }
  
  const result = await response.json();
  if (!result.ok) {
    throw new Error(`Telegram API error: ${JSON.stringify(result)}`);
  }
}