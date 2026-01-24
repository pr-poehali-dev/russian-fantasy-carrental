import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Partners() {
  return (
    <div className="min-h-screen">
      {/* Навигация */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <a href="/" className="flex items-center gap-2">
              <Icon name="Car" className="text-primary" size={24} />
              <span className="text-lg font-bold text-primary">Русская Фантазия</span>
            </a>
            <div className="flex items-center gap-5">
              <a href="/#autopark" className="text-sm hover:text-primary transition">Автопарк</a>
              <a href="/conditions" className="text-sm hover:text-primary transition">Условия аренды</a>
              <a href="/about" className="text-sm hover:text-primary transition">О компании</a>
              <a href="/partners" className="text-sm text-primary font-semibold transition">Партнёрам</a>
              <a href="/#reviews" className="text-sm hover:text-primary transition">Отзывы</a>
              <Button size="sm" className="bg-primary hover:bg-primary/90">Забронировать</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero секция */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Пассивный доход с вашего автомобиля
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Ваш микроавтобус работает на вас! Сдавайте в аренду через наш сильный бренд и получайте стабильный доход, пока мы развиваемся по всей России
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">70%</div>
                <div className="text-sm text-white/90">вам от аренды</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-white/90">поддержка</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-white/90">легально</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества работы с нами */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Почему собственники выбирают нас</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Уникальный бренд «Русская Фантазия» работает для того, чтобы каждый гражданин нашей страны мог путешествовать по бескрайней России
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Преимущество 1 */}
            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className="pt-6 pb-6 px-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Users" className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Поток клиентов</h3>
                <p className="text-muted-foreground">
                  У нас постоянная база проверенных клиентов. Ваш автомобиль не будет простаивать — мы обеспечим высокую загрузку круглый год.
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 2 */}
            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className="pt-6 pb-6 px-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="TrendingUp" className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Высокий доход</h3>
                <p className="text-muted-foreground">
                  Получайте до 70% от каждой аренды. Такой процент возможен благодаря тому, что вы самостоятельно обеспечиваете страхование и ТО автомобиля.
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 3 */}
            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className="pt-6 pb-6 px-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Building2" className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Собственное СТО</h3>
                <p className="text-muted-foreground">
                  В середине 2026 года открываем собственное СТО для обслуживания всех автомобилей партнёров. Гарантии качества и выгодные цены на ТО!
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 4 */}
            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className="pt-6 pb-6 px-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="FileText" className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Официальное сотрудничество</h3>
                <p className="text-muted-foreground">
                  Работаем по договору с прозрачными условиями. Вы получаете белый доход с документальным подтверждением.
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 5 */}
            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className="pt-6 pb-6 px-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Wallet" className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Стабильные выплаты</h3>
                <p className="text-muted-foreground">
                  Получайте 70% от дохода с аренды. Выплаты 2 раза в месяц без задержек на вашу карту или счёт — это пассивный доход!
                </p>
              </CardContent>
            </Card>

            {/* Преимущество 6 */}
            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardContent className="pt-6 pb-6 px-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="MapPin" className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Развитие по России</h3>
                <p className="text-muted-foreground">
                  Мы активно развиваемся по всей стране. Присоединяйтесь к сильному бренду на этапе роста и зарабатывайте больше!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-muted/30 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Как начать зарабатывать</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Шаг 1 */}
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Оставьте заявку</h3>
                  <p className="text-muted-foreground text-lg">
                    Заполните форму ниже или позвоните нам. Расскажите о вашем автомобиле — марка, год выпуска, состояние.
                  </p>
                </div>
              </div>

              {/* Шаг 2 */}
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Осмотр на СТО</h3>
                  <p className="text-muted-foreground text-lg">
                    Проводим профессиональный осмотр автомобиля на нашем СТО, обсуждаем условия сотрудничества и рассчитываем ваш доход.
                  </p>
                </div>
              </div>

              {/* Шаг 3 */}
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Подписание договора</h3>
                  <p className="text-muted-foreground text-lg">
                    Заключаем официальный договор аренды. Вы передаёте автомобиль и получаете первую выплату уже через неделю.
                  </p>
                </div>
              </div>

              {/* Шаг 4 */}
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Получайте доход</h3>
                  <p className="text-muted-foreground text-lg">
                    Ваш автомобиль работает, мы управляем арендой, а вы получаете стабильные выплаты 2 раза в месяц.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Требования к автомобилю */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Требования к автомобилю</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Мы работаем с качественными автомобилями, которые обеспечивают комфорт нашим клиентам
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-2">
              <CardContent className="pt-6 pb-6 px-6">
                <div className="flex items-start gap-4">
                  <Icon name="CheckCircle" className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Марка и модель</h3>
                    <p className="text-muted-foreground">
                      Микроавтобусы: Hyundai Grand Starex, Mercedes Vito/Viano, Volkswagen Caravelle, Ford Transit и аналоги
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 pb-6 px-6">
                <div className="flex items-start gap-4">
                  <Icon name="CheckCircle" className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Год выпуска</h3>
                    <p className="text-muted-foreground">
                      Автомобиль не старше 2012 года. Предпочтение автомобилям 2015 года и новее
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 pb-6 px-6">
                <div className="flex items-start gap-4">
                  <Icon name="CheckCircle" className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Техническое состояние</h3>
                    <p className="text-muted-foreground">
                      Исправная ходовая часть, двигатель, КПП. Без серьёзных кузовных повреждений и коррозии
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 pb-6 px-6">
                <div className="flex items-start gap-4">
                  <Icon name="CheckCircle" className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Салон и внешний вид</h3>
                    <p className="text-muted-foreground">
                      Чистый ухоженный салон, целые сиденья, работающий кондиционер. Презентабельный внешний вид
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Форма заявки */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-muted/30 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Оставьте заявку</h2>
            <p className="text-center text-muted-foreground mb-8">
              Заполните форму, и наш менеджер свяжется с вами в течение часа для обсуждения условий
            </p>
            <Card className="shadow-xl">
              <CardContent className="pt-8 pb-8 px-8">
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-semibold mb-2">Ваше имя</Label>
                    <Input id="name" placeholder="Иван Иванов" className="h-12" />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold mb-2">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" className="h-12" />
                  </div>

                  <div>
                    <Label htmlFor="car" className="text-base font-semibold mb-2">Марка и модель автомобиля</Label>
                    <Input id="car" placeholder="Hyundai Grand Starex" className="h-12" />
                  </div>

                  <div>
                    <Label htmlFor="year" className="text-base font-semibold mb-2">Год выпуска</Label>
                    <Input id="year" type="number" placeholder="2017" className="h-12" />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-base font-semibold mb-2">Дополнительная информация</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Расскажите о состоянии автомобиля, пробеге, комплектации..."
                      className="min-h-32"
                    />
                  </div>

                  <Button type="submit" className="w-full h-14 text-lg font-semibold">
                    Отправить заявку
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Частые вопросы</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="border-2">
              <CardContent className="pt-6 pb-6 px-6">
                <h3 className="font-bold text-lg mb-2">Сколько я буду зарабатывать?</h3>
                <p className="text-muted-foreground">
                  В среднем собственник микроавтобуса получает от 60 000₽ до 90 000₽ в месяц. Доход зависит от марки, года выпуска и загруженности автомобиля.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 pb-6 px-6">
                <h3 className="font-bold text-lg mb-2">Почему 70%, а не больше?</h3>
                <p className="text-muted-foreground">
                  Такой высокий процент возможен, потому что страхование (КАСКО/ОСАГО) и техобслуживание автомобиля остаются на вашей стороне. Мы занимаемся только поиском клиентов и управлением арендой.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 pb-6 px-6">
                <h3 className="font-bold text-lg mb-2">Могу ли я забрать автомобиль в любой момент?</h3>
                <p className="text-muted-foreground">
                  Да, договор предусматривает расторжение с уведомлением за 14 дней. Вы всегда можете забрать автомобиль по окончании текущей аренды.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 pb-6 px-6">
                <h3 className="font-bold text-lg mb-2">Кто оплачивает ремонт и ТО?</h3>
                <p className="text-muted-foreground">
                  Страхование и техобслуживание остаются на вашей стороне. Но с открытием собственного СТО в 2026 г. партнёры получат выгодные цены на обслуживание и гарантии качества!
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6 pb-6 px-6">
                <h3 className="font-bold text-lg mb-2">Это действительно пассивный доход?</h3>
                <p className="text-muted-foreground">
                  Да! Ваш автомобиль работает на вас. Мы полностью берём на себя поиск клиентов, оформление, управление арендой. Вы просто получаете регулярные выплаты 2 раза в месяц.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Начните зарабатывать уже сейчас</h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Оставьте заявку сегодня и получите бонус 5000₽ к первой выплате при заключении договора
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold h-14 px-8">
              <Icon name="Phone" className="mr-2" size={20} />
              Позвонить нам
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8">
              <Icon name="MessageCircle" className="mr-2" size={20} />
              Написать в WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Car" className="text-primary" size={24} />
                <span className="text-base font-bold text-white">Русская Фантазия</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Навигация</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="/" className="hover:text-white transition">Главная</a></li>
                <li><a href="/#autopark" className="hover:text-white transition">Автопарк</a></li>
                <li><a href="/conditions" className="hover:text-white transition">Условия аренды</a></li>
                <li><a href="/about" className="hover:text-white transition">О компании</a></li>
                <li><a href="/partners" className="hover:text-white transition">Партнёрам</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Контакты</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  <span>+7 (999) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  <span>info@rusfantasy.ru</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Мы в соцсетях</h4>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" className="border-gray-600 hover:bg-primary hover:border-primary h-8 w-8">
                  <Icon name="MessageCircle" size={16} />
                </Button>
                <Button size="icon" variant="outline" className="border-gray-600 hover:bg-primary hover:border-primary h-8 w-8">
                  <Icon name="Send" size={16} />
                </Button>
                <Button size="icon" variant="outline" className="border-gray-600 hover:bg-primary hover:border-primary h-8 w-8">
                  <Icon name="Phone" size={16} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-5 text-center text-xs text-gray-400">
            <p>© 2024 Русская Фантазия. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}