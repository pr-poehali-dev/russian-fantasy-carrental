import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Навигация */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <Icon name="Car" className="text-primary" size={32} />
              <span className="text-xl font-bold text-primary">Русская Фантазия</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="/#autopark" className="text-sm hover:text-primary transition">Автопарк</a>
              <a href="/conditions" className="text-sm hover:text-primary transition">Условия аренды</a>
              <a href="/about" className="text-sm text-primary font-medium">О компании</a>
              <a href="/#pricing" className="text-sm hover:text-primary transition">Стоимость</a>
              <Button>Забронировать</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">О компании</h1>
          <p className="text-xl text-muted-foreground">Ваш надежный партнер в путешествиях по России</p>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* О компании */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Кто мы такие</h2>
            <p className="text-lg text-muted-foreground mb-6">
              <strong>Русская Фантазия</strong> — это современный сервис аренды микроавтобусов Hyundai Grand Starex
              без водителя. Мы работаем с 2018 года и за это время помогли более 2000 клиентам совершить
              комфортные путешествия по России.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Наша миссия — делать путешествия доступными, комфортными и безопасными. Мы предлагаем качественные
              автомобили, прозрачные условия аренды и профессиональный сервис.
            </p>
            <p className="text-lg text-muted-foreground">
              Наш офис работает в Москве — сердце России. Мы предоставляем качественный сервис аренды микроавтобусов
              для путешествий по всей стране.
            </p>
          </div>

          {/* Достижения */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">2000+</div>
                <p className="text-muted-foreground">Довольных клиентов</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Calendar" className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">5</div>
                <p className="text-muted-foreground">Лет на рынке</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Star" className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">5.0</div>
                <p className="text-muted-foreground">Средний рейтинг</p>
              </CardContent>
            </Card>
          </div>

          {/* Почему выбирают нас */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Почему выбирают нас</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="ShieldCheck" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Надежность и безопасность</h3>
                      <p className="text-muted-foreground">
                        Все автомобили регулярно проходят техническое обслуживание. Каждая машина застрахована
                        по ОСАГО без ограничений по количеству водителей.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Sparkles" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Чистота и комфорт</h3>
                      <p className="text-muted-foreground">
                        Каждый автомобиль перед выдачей проходит тщательную мойку и химчистку салона.
                        В каждом авто есть набор путешественника.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Headphones" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Круглосуточная поддержка</h3>
                      <p className="text-muted-foreground">
                        Наши менеджеры готовы помочь вам 24/7. В любой момент вы можете связаться с нами
                        по телефону, WhatsApp или Telegram.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="DollarSign" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Прозрачные цены</h3>
                      <p className="text-muted-foreground">
                        Никаких скрытых платежей. Все дополнительные услуги и опции обсуждаются заранее.
                        Вы платите только за то, что указано в договоре.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Наш офис */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Наш офис</h2>
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="MapPin" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Москва</h3>
                  <p className="text-muted-foreground mb-4">
                    ул. Примерная, 1<br />
                    +7 (900) 123-45-67
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Пн-Вс: 08:00 — 22:00
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Начните путешествие с нами</h3>
            <p className="mb-6 opacity-90">Забронируйте автомобиль прямо сейчас</p>
            <Button size="lg" variant="secondary">
              <Icon name="Calendar" className="mr-2" size={20} />
              Забронировать авто
            </Button>
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
                Аренда микроавтобусов в Москве
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/#autopark" className="text-muted-foreground hover:text-primary transition">Автопарк</a></li>
                <li><a href="/conditions" className="text-muted-foreground hover:text-primary transition">Условия аренды</a></li>
                <li><a href="/about" className="text-muted-foreground hover:text-primary transition">О компании</a></li>
                <li><a href="/#pricing" className="text-muted-foreground hover:text-primary transition">Стоимость</a></li>
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
                  <span>Москва, ул. Примерная, 1</span>
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