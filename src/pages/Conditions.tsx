import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Conditions() {
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
              <a href="/conditions" className="text-sm text-primary font-medium">Условия аренды</a>
              <a href="/about" className="text-sm hover:text-primary transition">О компании</a>
              <a href="/#pricing" className="text-sm hover:text-primary transition">Стоимость</a>
              <Button>Забронировать</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Условия аренды</h1>
          <p className="text-xl text-muted-foreground">Прозрачные правила для комфортной поездки</p>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Требования к арендатору */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="UserCheck" className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Требования к арендатору</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Возраст от 23 лет</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Водительский стаж от 3 лет</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Наличие паспорта РФ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Водительское удостоверение категории B</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Необходимые документы */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="FileText" className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Необходимые документы</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Паспорт гражданина РФ (оригинал)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Водительское удостоверение (оригинал)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Для юридических лиц - доверенность и реквизиты</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Залог и оплата */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="CreditCard" className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Залог и оплата</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Залог - 15 000 рублей (возвращается при сдаче авто)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Оплата при получении автомобиля</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Принимаем наличные и безналичный расчет</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Возможна оплата по карте</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Правила эксплуатации */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="ShieldCheck" className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Правила эксплуатации</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Без ограничений по пробегу</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Передача автомобиля третьим лицам запрещена</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Курение в салоне запрещено (штраф 5 000₽)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Возврат автомобиля с тем же уровнем топлива</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>Выезд за границу - по согласованию</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Страхование */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Страхование</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>ОСАГО включено в стоимость (без ограничений по водителям)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>КАСКО - по желанию (+500₽/сутки)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary mt-1" size={16} />
                      <span>При ДТП по вине арендатора - франшиза 30 000₽</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Остались вопросы?</h3>
            <p className="mb-6 opacity-90">Наши менеджеры с радостью вас проконсультируют</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Icon name="Phone" className="mr-2" size={20} />
                Позвонить
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Написать в WhatsApp
              </Button>
            </div>
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