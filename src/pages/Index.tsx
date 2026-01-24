import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function Index() {
  const [pickupCity, setPickupCity] = useState('');
  const [returnDifferentCity, setReturnDifferentCity] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [mileage, setMileage] = useState('');
  const [childSeats, setChildSeats] = useState(false);
  const [transponder, setTransponder] = useState(false);
  const [roofBox, setRoofBox] = useState(false);
  const [fridge, setFridge] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [abroad, setAbroad] = useState(false);

  const cities = ['Краснодар', 'Москва', 'Санкт-Петербург'];

  const autoImages = [
    'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800',
    'https://images.unsplash.com/photo-1552889886-f6a0df34f7c5?w=800',
    'https://images.unsplash.com/photo-1562141961-4c12c1e49c4b?w=800',
  ];

  return (
    <div className="min-h-screen">
      {/* Навигация */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <Icon name="Car" className="text-primary" size={32} />
              <span className="text-xl font-bold text-primary">Русская Фантазия</span>
            </a>
            <div className="hidden lg:flex items-center gap-6">
              <a href="#autopark" className="text-sm font-medium hover:text-primary transition">Автопарк</a>
              <a href="/conditions" className="text-sm font-medium hover:text-primary transition">Условия аренды</a>
              <a href="/about" className="text-sm font-medium hover:text-primary transition">О компании</a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition">Стоимость</a>
              <a href="#reviews" className="text-sm font-medium hover:text-primary transition">Отзывы</a>
              <Button className="bg-primary hover:bg-primary/90">Забронировать</Button>
            </div>
            <button className="lg:hidden">
              <Icon name="Menu" size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero секция с формой */}
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Левая часть - текст и рейтинги */}
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Аренда микроавтобусов Hyundai Grand Starex
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Комфортная поездка — в одном шаге от Вас!
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/95 px-4 py-3 rounded-lg shadow-lg">
                  <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="font-semibold text-gray-900">Яндекс 5.0</span>
                </div>
                <div className="flex items-center gap-2 bg-white/95 px-4 py-3 rounded-lg shadow-lg">
                  <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="font-semibold text-gray-900">Avito 5.0</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  Условия аренды
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Полезное для Вас
                </Button>
              </div>
            </div>

            {/* Правая часть - форма бронирования */}
            <Card className="shadow-2xl">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-primary">Забронировать автомобиль</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="pickup-city" className="text-base font-semibold mb-2">Город выдачи авто</Label>
                    <Select value={pickupCity} onValueChange={setPickupCity}>
                      <SelectTrigger id="pickup-city" className="h-12">
                        <SelectValue placeholder="Выберите город" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <Switch
                      id="different-city"
                      checked={returnDifferentCity}
                      onCheckedChange={setReturnDifferentCity}
                    />
                    <Label htmlFor="different-city" className="cursor-pointer font-medium">
                      Сдать в другом городе
                    </Label>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-2">Период аренды</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left h-12 font-normal">
                          <Icon name="Calendar" className="mr-2" size={18} />
                          {dateRange.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, 'dd MMM', { locale: ru })} -{' '}
                                {format(dateRange.to, 'dd MMM yyyy', { locale: ru })}
                              </>
                            ) : (
                              format(dateRange.from, 'dd MMM yyyy', { locale: ru })
                            )
                          ) : (
                            'Выберите даты'
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={{ from: dateRange.from, to: dateRange.to }}
                          onSelect={(range) =>
                            setDateRange({
                              from: range?.from,
                              to: range?.to,
                            })
                          }
                          numberOfMonths={2}
                          locale={ru}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="mileage" className="text-base font-semibold mb-2">Общий пробег поездки (км)</Label>
                    <Input
                      id="mileage"
                      type="number"
                      placeholder="Введите километраж"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-3 pt-2 border-t">
                    <p className="text-sm font-bold text-gray-700">Дополнительные опции</p>
                    <div className="flex items-center gap-3">
                      <Switch id="child-seats" checked={childSeats} onCheckedChange={setChildSeats} />
                      <Label htmlFor="child-seats" className="cursor-pointer text-sm">Детские кресла</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="transponder" checked={transponder} onCheckedChange={setTransponder} />
                      <Label htmlFor="transponder" className="cursor-pointer text-sm">Транспондер</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="roof-box" checked={roofBox} onCheckedChange={setRoofBox} />
                      <Label htmlFor="roof-box" className="cursor-pointer text-sm">Автобокс</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="fridge" checked={fridge} onCheckedChange={setFridge} />
                      <Label htmlFor="fridge" className="cursor-pointer text-sm">Холодильник</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="delivery" checked={delivery} onCheckedChange={setDelivery} />
                      <Label htmlFor="delivery" className="cursor-pointer text-sm">Доставка авто</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="abroad" checked={abroad} onCheckedChange={setAbroad} />
                      <Label htmlFor="abroad" className="cursor-pointer text-sm">Выезд за границу</Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 text-base font-semibold" size="lg">
                    Найти автомобиль
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Автопарк */}
      <section id="autopark" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Автопарк</h2>
          <p className="text-center text-lg text-muted-foreground mb-10">
            Минивэны Hyundai Grand Starex (2015, 2016, 2017 г.в.)
          </p>
          <div className="flex flex-wrap gap-6 justify-center mb-10">
            <div className="flex items-center gap-3 bg-primary/10 px-5 py-3 rounded-lg">
              <Icon name="Users" className="text-primary" size={24} />
              <span className="font-semibold text-lg">9 мест</span>
            </div>
            <div className="flex items-center gap-3 bg-primary/10 px-5 py-3 rounded-lg">
              <Icon name="Gauge" className="text-primary" size={24} />
              <span className="font-semibold text-lg">Автомат</span>
            </div>
            <div className="flex items-center gap-3 bg-primary/10 px-5 py-3 rounded-lg">
              <Icon name="Fuel" className="text-primary" size={24} />
              <span className="font-semibold text-lg">Дизель</span>
            </div>
            <div className="flex items-center gap-3 bg-primary/10 px-5 py-3 rounded-lg">
              <Icon name="Award" className="text-primary" size={24} />
              <span className="font-semibold text-lg">Категория B</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {autoImages.map((img, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src={img} alt={`Автомобиль ${index + 1}`} className="w-full h-64 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section id="benefits" className="py-16 md:py-20 bg-gradient-to-b from-muted/30 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Наши преимущества</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Преимущество 1 */}
            <Card className="relative overflow-hidden border-2 hover:border-primary transition-colors duration-300">
              <div className="absolute top-6 left-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                1
              </div>
              <CardContent className="pt-24 pb-8 px-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Профессионализм</h3>
                <p className="text-muted-foreground leading-relaxed">
                  За 5 лет нами обслужено более 2000 клиентов. Высокие оценки на Avito, Яндекс и 2ГИС
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 2 */}
            <Card className="relative overflow-hidden border-2 hover:border-primary transition-colors duration-300">
              <div className="absolute top-6 left-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                2
              </div>
              <CardContent className="pt-24 pb-8 px-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Работа с Физ. и Юр. лицами</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Заключение договоров с физическими лицами, юридическими лицами и ИП
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 3 */}
            <Card className="relative overflow-hidden border-2 hover:border-primary transition-colors duration-300">
              <div className="absolute top-6 left-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                3
              </div>
              <CardContent className="pt-24 pb-8 px-6">
                <h3 className="text-xl font-bold mb-3 text-primary">ОСАГО/КАСКО на выбор</h3>
                <p className="text-muted-foreground leading-relaxed">
                  ОСАГО — без ограничений по водителям, опция КАСКО для вашего спокойствия
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 4 */}
            <Card className="relative overflow-hidden border-2 hover:border-primary transition-colors duration-300">
              <div className="absolute top-6 left-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                4
              </div>
              <CardContent className="pt-24 pb-8 px-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Набор путешественника</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Вода, влажные салфетки, крепление и зарядка для телефона в каждом авто
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 5 */}
            <Card className="relative overflow-hidden border-2 hover:border-primary transition-colors duration-300 sm:col-span-2 lg:col-span-1">
              <div className="absolute top-6 left-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                5
              </div>
              <CardContent className="pt-24 pb-8 px-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Дополнительные опции</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Детские кресла, багажник на крышу, кресла для отдыха, стол, мангал, газовая горелка
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Стоимость */}
      <section id="pricing" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Стоимость аренды</h2>
          <p className="text-center text-lg text-muted-foreground mb-12">Прозрачные цены без скрытых платежей</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Тариф 1 */}
            <Card className="hover:shadow-2xl transition-shadow duration-300 border-2">
              <CardContent className="pt-8 pb-8 px-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-3">1-2 дня</h3>
                  <div className="text-5xl font-bold text-primary mb-2">3500₽</div>
                  <p className="text-muted-foreground text-lg">в сутки</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-sm leading-relaxed">Без ограничений по километражу</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-sm leading-relaxed">ОСАГО включено</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-sm leading-relaxed">Набор путешественника</span>
                  </li>
                </ul>
                <Button className="w-full h-12 font-semibold">Забронировать</Button>
              </CardContent>
            </Card>

            {/* Тариф 2 */}
            <Card className="hover:shadow-2xl transition-shadow duration-300 border-2 border-primary relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2 text-sm font-bold">
                ⭐ Популярный
              </div>
              <CardContent className="pt-16 pb-8 px-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-3">3-7 дней</h3>
                  <div className="text-5xl font-bold text-primary mb-2">3000₽</div>
                  <p className="text-muted-foreground text-lg">в сутки</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-sm leading-relaxed">Без ограничений по километражу</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-sm leading-relaxed">ОСАГО включено</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-sm leading-relaxed">Набор путешественника</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-sm leading-relaxed font-semibold">Скидка 15%</span>
                  </li>
                </ul>
                <Button className="w-full h-12 font-semibold">Забронировать</Button>
              </CardContent>
            </Card>

            {/* Тариф 3 */}
            <Card className="hover:shadow-2xl transition-shadow duration-300 border-2 sm:col-span-2 lg:col-span-1">
              <CardContent className="pt-8 pb-8 px-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-3">8+ дней</h3>
                  <div className="text-5xl font-bold text-primary mb-2">2500₽</div>
                  <p className="text-muted-foreground text-lg">в сутки</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-sm leading-relaxed">Без ограничений по километражу</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-sm leading-relaxed">ОСАГО включено</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-sm leading-relaxed">Набор путешественника</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-sm leading-relaxed font-semibold">Скидка 30%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-sm leading-relaxed font-semibold">Бесплатная доставка авто</span>
                  </li>
                </ul>
                <Button className="w-full h-12 font-semibold">Забронировать</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section id="reviews" className="py-16 md:py-20 bg-gradient-to-b from-muted/30 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Отзывы наших клиентов</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Иван Петров',
                city: 'Москва',
                text: 'Отличный сервис! Машина чистая, в хорошем состоянии. Все документы оформили быстро. Обязательно вернемся еще!',
              },
              {
                name: 'Мария Сидорова',
                city: 'Санкт-Петербург',
                text: 'Прекрасный автомобиль для семейной поездки. Менеджеры помогли со всеми вопросами. Очень довольны!',
              },
              {
                name: 'Александр Иванов',
                city: 'Краснодар',
                text: 'Арендовали на неделю для поездки по югу. Машина вместительная, удобная. Цена адекватная. Рекомендую!',
              },
            ].map((review, i) => (
              <Card key={i} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon key={star} name="Star" className="text-yellow-500 fill-yellow-500" size={18} />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="User" className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.city}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы начать путешествие?</h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Забронируйте автомобиль прямо сейчас и получите скидку 10% на первую аренду
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold h-14 px-8">
              <Icon name="Calendar" className="mr-2" size={20} />
              Забронировать авто
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8">
              <Icon name="Phone" className="mr-2" size={20} />
              Позвонить нам
            </Button>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Car" className="text-primary" size={32} />
                <span className="text-xl font-bold text-white">Русская Фантазия</span>
              </div>
              <p className="text-sm text-gray-400">
                Аренда микроавтобусов в Краснодаре, Москве и Санкт-Петербурге
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#autopark" className="hover:text-primary transition">Автопарк</a></li>
                <li><a href="/conditions" className="hover:text-primary transition">Условия аренды</a></li>
                <li><a href="/about" className="hover:text-primary transition">О компании</a></li>
                <li><a href="#pricing" className="hover:text-primary transition">Стоимость</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Контакты</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span>+7 (900) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span>info@rusfantasy.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span>Краснодар, ул. Примерная, 1</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="border-gray-600 hover:bg-primary hover:border-primary">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="border-gray-600 hover:bg-primary hover:border-primary">
                  <Icon name="Send" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="border-gray-600 hover:bg-primary hover:border-primary">
                  <Icon name="Phone" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Русская Фантазия. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
