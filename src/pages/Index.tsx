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
    <div className="min-h-screen bg-background">
      {/* Навигация */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Icon name="Car" className="text-primary" size={32} />
              <span className="text-xl font-bold text-primary">Русская Фантазия</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#autopark" className="text-sm hover:text-primary transition">Автопарк</a>
              <a href="#conditions" className="text-sm hover:text-primary transition">Условия аренды</a>
              <a href="#useful" className="text-sm hover:text-primary transition">Полезное</a>
              <a href="#about" className="text-sm hover:text-primary transition">О компании</a>
              <a href="#pricing" className="text-sm hover:text-primary transition">Стоимость</a>
              <a href="#reviews" className="text-sm hover:text-primary transition">Отзывы</a>
              <Button>Забронировать</Button>
            </div>
            <button className="md:hidden">
              <Icon name="Menu" size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero секция с формой */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Левая часть - текст и рейтинги */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Аренда микроавтобусов,<br />минивэнов Hyundai Grand Starex
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Комфортная поездка — в одном шаге от Вас!
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="font-semibold">Яндекс 5.0</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="font-semibold">Avito 5.0</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Условия аренды
                </Button>
                <Button size="lg" variant="outline">
                  Полезное для Вас
                </Button>
              </div>
            </div>

            {/* Правая часть - форма бронирования */}
            <Card className="shadow-xl">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Забронировать автомобиль</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="pickup-city">Город выдачи авто</Label>
                    <Select value={pickupCity} onValueChange={setPickupCity}>
                      <SelectTrigger id="pickup-city">
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

                  <div className="flex items-center gap-2">
                    <Switch
                      id="different-city"
                      checked={returnDifferentCity}
                      onCheckedChange={setReturnDifferentCity}
                    />
                    <Label htmlFor="different-city" className="cursor-pointer">
                      Сдать в другом городе
                    </Label>
                  </div>

                  <div>
                    <Label>Период аренды</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <Icon name="Calendar" className="mr-2" size={16} />
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
                    <Label htmlFor="mileage">Общий пробег поездки (км)</Label>
                    <Input
                      id="mileage"
                      type="number"
                      placeholder="Введите километраж"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <p className="text-sm font-medium">Дополнительные опции</p>
                    <div className="flex items-center gap-2">
                      <Switch id="child-seats" checked={childSeats} onCheckedChange={setChildSeats} />
                      <Label htmlFor="child-seats" className="cursor-pointer">Детские кресла</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="transponder" checked={transponder} onCheckedChange={setTransponder} />
                      <Label htmlFor="transponder" className="cursor-pointer">Транспондер</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="roof-box" checked={roofBox} onCheckedChange={setRoofBox} />
                      <Label htmlFor="roof-box" className="cursor-pointer">Автобокс</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="fridge" checked={fridge} onCheckedChange={setFridge} />
                      <Label htmlFor="fridge" className="cursor-pointer">Холодильник</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="delivery" checked={delivery} onCheckedChange={setDelivery} />
                      <Label htmlFor="delivery" className="cursor-pointer">Доставка авто</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="abroad" checked={abroad} onCheckedChange={setAbroad} />
                      <Label htmlFor="abroad" className="cursor-pointer">Выезд за границу</Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Найти
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Автопарк */}
      <section id="autopark" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Автопарк</h2>
          <p className="text-center text-muted-foreground mb-8">
            Минивэны Hyundai Grand Starex (2015, 2016, 2017 г.в.)
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <div className="flex items-center gap-2">
              <Icon name="Users" className="text-primary" />
              <span>9 мест</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Gauge" className="text-primary" />
              <span>Автомат</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Fuel" className="text-primary" />
              <span>Дизель</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Award" className="text-primary" />
              <span>Категория B</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {autoImages.map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                <img src={img} alt={`Автомобиль ${index + 1}`} className="w-full h-64 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section id="benefits" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Преимущество 1 */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-4 left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <CardContent className="pt-20 pb-6">
                <h3 className="text-xl font-semibold mb-3">Профессионализм</h3>
                <p className="text-muted-foreground">
                  За 5 лет нами обслужено более 2000 клиентов. Высокие оценки на Avito, Яндекс и 2ГИС
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 2 */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-4 left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <CardContent className="pt-20 pb-6">
                <h3 className="text-xl font-semibold mb-3">Работа с Физ. и Юр. лицами</h3>
                <p className="text-muted-foreground">
                  Заключение договоров с физическими лицами, юридическими лицами и ИП
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 3 */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-4 left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <CardContent className="pt-20 pb-6">
                <h3 className="text-xl font-semibold mb-3">ОСАГО/КАСКО на выбор</h3>
                <p className="text-muted-foreground">
                  ОСАГО — без ограничений по водителям, опция КАСКО для вашего спокойствия
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 4 */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-4 left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <CardContent className="pt-20 pb-6">
                <h3 className="text-xl font-semibold mb-3">Набор путешественника</h3>
                <p className="text-muted-foreground">
                  Вода, влажные салфетки, крепление и зарядка для телефона в каждом авто
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 5 */}
            <Card className="relative overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="absolute top-4 left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                5
              </div>
              <CardContent className="pt-20 pb-6">
                <h3 className="text-xl font-semibold mb-3">Дополнительные опции</h3>
                <p className="text-muted-foreground">
                  Детские кресла, багажник на крышу, кресла для отдыха, стол, мангал, газовая горелка
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Стоимость */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Стоимость аренды</h2>
          <p className="text-center text-muted-foreground mb-12">Прозрачные цены без скрытых платежей</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Тариф 1 */}
            <Card className="hover:shadow-xl transition">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">1-2 дня</h3>
                  <div className="text-4xl font-bold text-primary mb-2">3500₽</div>
                  <p className="text-muted-foreground">в сутки</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span className="text-sm">Без ограничений по километражу</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span className="text-sm">ОСАГО включено</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span className="text-sm">Набор путешественника</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Забронировать</Button>
              </CardContent>
            </Card>

            {/* Тариф 2 */}
            <Card className="hover:shadow-xl transition border-primary border-2">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="inline-block bg-primary text-white text-xs px-3 py-1 rounded-full mb-2">
                    Популярный
                  </div>
                  <h3 className="text-2xl font-bold mb-2">3-7 дней</h3>
                  <div className="text-4xl font-bold text-primary mb-2">3000₽</div>
                  <p className="text-muted-foreground">в сутки</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span className="text-sm">Без ограничений по километражу</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span className="text-sm">ОСАГО включено</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span className="text-sm">Набор путешественника</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span className="text-sm">Скидка 15%</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Забронировать</Button>
              </CardContent>
            </Card>

            {/* Тариф 3 */}
            <Card className="hover:shadow-xl transition">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">8+ дней</h3>
                  <div className="text-4xl font-bold text-primary mb-2">2500₽</div>
                  <p className="text-muted-foreground">в сутки</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span className="text-sm">Без ограничений по километражу</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span className="text-sm">ОСАГО включено</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span className="text-sm">Набор путешественника</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span className="text-sm">Скидка 30%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span className="text-sm">Бесплатная доставка авто</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Забронировать</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section id="reviews" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Отзывы наших клиентов</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon key={star} name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Отличный сервис! Машина чистая, в хорошем состоянии. Все документы оформили быстро. Обязательно вернемся еще!
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Icon name="User" className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Иван Петров</p>
                      <p className="text-sm text-muted-foreground">Москва</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-card py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Car" className="text-primary" size={32} />
                <span className="text-xl font-bold">Русская Фантазия</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Аренда микроавтобусов в Краснодаре, Москве и Санкт-Петербурге
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#autopark" className="text-muted-foreground hover:text-primary transition">Автопарк</a></li>
                <li><a href="#conditions" className="text-muted-foreground hover:text-primary transition">Условия аренды</a></li>
                <li><a href="#useful" className="text-muted-foreground hover:text-primary transition">Полезное</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition">О компании</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (900) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@rusfantasy.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Краснодар, ул. Примерная, 1</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon name="Send" size={20} />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon name="Phone" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Русская Фантазия. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
