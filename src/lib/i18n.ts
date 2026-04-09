export type Language = "en" | "zh" | "es" | "ja" | "ko" | "fr" | "de" | "pt";

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
];

interface Translations {
  // Header
  appName: string;
  appTagline: string;
  switchToLight: string;
  switchToDark: string;
  buyMeACoffee: string;

  // Timer
  ready: string;
  focusing: string;
  shortBreak: string;
  longBreak: string;

  // Session tracker
  pomodorosToday: (count: number) => string;
  cycles: (count: number) => string;
  reset: string;

  // Controls
  startFocus: string;
  stop: string;
  skipBreak: string;

  // Duration picker
  focus: string;
  breakLabel: string;
  longBreakLabel: string;

  // Ambient sounds
  ambientSound: string;
  off: string;
  white: string;
  brown: string;
  rain: string;
  ocean: string;

  // Break overlay
  timeForEyeBreak: string;
  longBreakTime: string;
  stepAway: string;
  completed4: string;
  startBreakBtn: string;
  startLongBreakBtn: string;
  skipKeepWorking: string;
  breakOverNotify: string;

  // Eye tips
  eyeTips: { title: string; text: string }[];

  // Welcome modal
  welcomeTitle: string;
  welcomeDesc: string;
  name: string;
  yourName: string;
  email: string;
  emailPlaceholder: string;
  newsletterText: string;
  getStarted: string;
  settingUp: string;

  // Footer
  freeToolBy: string;

  // Spotify
  openSpotify: string;

  // Language
  language: string;
}

const en: Translations = {
  appName: "Pomodoro Eye Care",
  appTagline: "Focus timer with eye health reminders",
  switchToLight: "Switch to light mode",
  switchToDark: "Switch to dark mode",
  buyMeACoffee: "Buy me a coffee",
  ready: "Ready",
  focusing: "Focusing",
  shortBreak: "Short Break",
  longBreak: "Long Break",
  pomodorosToday: (n) => `${n} pomodoro${n !== 1 ? "s" : ""} today`,
  cycles: (n) => `(${n} cycle${n !== 1 ? "s" : ""})`,
  reset: "Reset",
  startFocus: "Start Focus",
  stop: "Stop",
  skipBreak: "Skip Break",
  focus: "Focus",
  breakLabel: "Break",
  longBreakLabel: "Long Break",
  ambientSound: "Ambient Sound",
  off: "Off",
  white: "White",
  brown: "Brown",
  rain: "Rain",
  ocean: "Ocean",
  timeForEyeBreak: "Time for an Eye Break!",
  longBreakTime: "Long Break Time!",
  stepAway: "Step away from the screen.",
  completed4: "You completed 4 pomodoros. Take a longer rest.",
  startBreakBtn: "Start Break",
  startLongBreakBtn: "Start Long Break",
  skipKeepWorking: "Skip, Keep Working",
  breakOverNotify: "Break is over! Ready to focus?",
  eyeTips: [
    { title: "20-20-20 Rule", text: "Look at something 20 feet away for 20 seconds." },
    { title: "Deep Breathing", text: "Close your eyes and take 5 slow, deep breaths." },
    { title: "Eye Rolls", text: "Roll your eyes in circles — clockwise, then counter-clockwise." },
    { title: "Rapid Blinks", text: "Blink rapidly 10 times to re-moisten your eyes." },
    { title: "Palm Cupping", text: "Cup your warm palms over your closed eyes for 15 seconds." },
    { title: "Distance Focus", text: "Focus on the farthest object you can see for 10 seconds." },
    { title: "Stretch Break", text: "Stand up, stretch your arms overhead, and roll your shoulders." },
    { title: "Hydrate", text: "Drink some water. Your eyes and body will thank you." },
  ],
  welcomeTitle: "Pomodoro Eye Care",
  welcomeDesc: "Focus timer with eye health reminders and ambient sounds. A free tool by TwoSetAI.",
  name: "Name",
  yourName: "Your name",
  email: "Email",
  emailPlaceholder: "you@example.com",
  newsletterText: "Subscribe to the",
  getStarted: "Get Started",
  settingUp: "Setting up...",
  freeToolBy: "A free tool by",
  openSpotify: "Open Focus Playlist on Spotify",
  language: "Language",
};

const zh: Translations = {
  appName: "番茄护眼计时器",
  appTagline: "专注计时，提醒护眼",
  switchToLight: "切换到浅色模式",
  switchToDark: "切换到深色模式",
  buyMeACoffee: "请我喝杯咖啡",
  ready: "准备就绪",
  focusing: "专注中",
  shortBreak: "短休息",
  longBreak: "长休息",
  pomodorosToday: (n) => `今天完成 ${n} 个番茄钟`,
  cycles: (n) => `(${n} 个循环)`,
  reset: "重置",
  startFocus: "开始专注",
  stop: "停止",
  skipBreak: "跳过休息",
  focus: "专注",
  breakLabel: "休息",
  longBreakLabel: "长休息",
  ambientSound: "环境音",
  off: "关闭",
  white: "白噪音",
  brown: "棕噪音",
  rain: "雨声",
  ocean: "海浪",
  timeForEyeBreak: "该让眼睛休息了！",
  longBreakTime: "长休息时间到！",
  stepAway: "离开屏幕，让眼睛放松。",
  completed4: "你已完成4个番茄钟，好好休息一下。",
  startBreakBtn: "开始休息",
  startLongBreakBtn: "开始长休息",
  skipKeepWorking: "跳过，继续工作",
  breakOverNotify: "休息结束！准备好继续了吗？",
  eyeTips: [
    { title: "20-20-20 法则", text: "看向20英尺（6米）外的物体，持续20秒。" },
    { title: "深呼吸", text: "闭上眼睛，慢慢做5次深呼吸。" },
    { title: "转动眼球", text: "顺时针转动眼球，再逆时针转动。" },
    { title: "快速眨眼", text: "快速眨眼10次，让眼睛重新湿润。" },
    { title: "手掌敷眼", text: "将温暖的手掌轻轻盖在闭着的眼睛上，持续15秒。" },
    { title: "远处聚焦", text: "注视你能看到的最远处，持续10秒。" },
    { title: "伸展休息", text: "站起来，举起双臂，转动肩膀。" },
    { title: "喝水", text: "喝点水，你的眼睛和身体会感谢你。" },
  ],
  welcomeTitle: "番茄护眼计时器",
  welcomeDesc: "专注计时器，带护眼提醒和环境音效。TwoSetAI 出品的免费工具。",
  name: "姓名",
  yourName: "你的名字",
  email: "邮箱",
  emailPlaceholder: "you@example.com",
  newsletterText: "订阅",
  getStarted: "开始使用",
  settingUp: "设置中...",
  freeToolBy: "免费工具，由",
  openSpotify: "在 Spotify 上打开专注歌单",
  language: "语言",
};

const es: Translations = {
  appName: "Pomodoro Cuida Ojos",
  appTagline: "Temporizador con recordatorios de salud visual",
  switchToLight: "Cambiar a modo claro",
  switchToDark: "Cambiar a modo oscuro",
  buyMeACoffee: "Invítame un café",
  ready: "Listo",
  focusing: "Enfocando",
  shortBreak: "Descanso Corto",
  longBreak: "Descanso Largo",
  pomodorosToday: (n) => `${n} pomodoro${n !== 1 ? "s" : ""} hoy`,
  cycles: (n) => `(${n} ciclo${n !== 1 ? "s" : ""})`,
  reset: "Reiniciar",
  startFocus: "Iniciar Enfoque",
  stop: "Detener",
  skipBreak: "Saltar Descanso",
  focus: "Enfoque",
  breakLabel: "Descanso",
  longBreakLabel: "Descanso Largo",
  ambientSound: "Sonido Ambiental",
  off: "Apagado",
  white: "Blanco",
  brown: "Marrón",
  rain: "Lluvia",
  ocean: "Océano",
  timeForEyeBreak: "¡Hora de descansar los ojos!",
  longBreakTime: "¡Hora del descanso largo!",
  stepAway: "Aléjate de la pantalla.",
  completed4: "Completaste 4 pomodoros. Tómate un descanso más largo.",
  startBreakBtn: "Iniciar Descanso",
  startLongBreakBtn: "Iniciar Descanso Largo",
  skipKeepWorking: "Saltar, Seguir Trabajando",
  breakOverNotify: "¡Se acabó el descanso! ¿Listo para enfocarte?",
  eyeTips: [
    { title: "Regla 20-20-20", text: "Mira algo a 6 metros de distancia durante 20 segundos." },
    { title: "Respiración Profunda", text: "Cierra los ojos y respira profundamente 5 veces." },
    { title: "Rotación de Ojos", text: "Gira los ojos en círculos: en sentido horario, luego antihorario." },
    { title: "Parpadeo Rápido", text: "Parpadea rápidamente 10 veces para humedecer tus ojos." },
    { title: "Palmas sobre los Ojos", text: "Coloca las palmas tibias sobre los ojos cerrados por 15 segundos." },
    { title: "Enfoque a Distancia", text: "Enfoca el objeto más lejano que puedas ver durante 10 segundos." },
    { title: "Estiramiento", text: "Levántate, estira los brazos y rota los hombros." },
    { title: "Hidratación", text: "Bebe algo de agua. Tus ojos y cuerpo te lo agradecerán." },
  ],
  welcomeTitle: "Pomodoro Cuida Ojos",
  welcomeDesc: "Temporizador con recordatorios de salud visual y sonidos ambientales. Una herramienta gratuita de TwoSetAI.",
  name: "Nombre",
  yourName: "Tu nombre",
  email: "Correo",
  emailPlaceholder: "tu@ejemplo.com",
  newsletterText: "Suscríbete al",
  getStarted: "Empezar",
  settingUp: "Configurando...",
  freeToolBy: "Herramienta gratuita de",
  openSpotify: "Abrir playlist de enfoque en Spotify",
  language: "Idioma",
};

const ja: Translations = {
  appName: "ポモドーロ アイケア",
  appTagline: "目の健康リマインダー付き集中タイマー",
  switchToLight: "ライトモードに切替",
  switchToDark: "ダークモードに切替",
  buyMeACoffee: "コーヒーをおごる",
  ready: "準備完了",
  focusing: "集中中",
  shortBreak: "短い休憩",
  longBreak: "長い休憩",
  pomodorosToday: (n) => `今日 ${n} ポモドーロ`,
  cycles: (n) => `(${n} サイクル)`,
  reset: "リセット",
  startFocus: "集中開始",
  stop: "停止",
  skipBreak: "休憩をスキップ",
  focus: "集中",
  breakLabel: "休憩",
  longBreakLabel: "長い休憩",
  ambientSound: "環境音",
  off: "オフ",
  white: "ホワイト",
  brown: "ブラウン",
  rain: "雨音",
  ocean: "波音",
  timeForEyeBreak: "目を休めましょう！",
  longBreakTime: "長い休憩の時間です！",
  stepAway: "画面から離れてください。",
  completed4: "4ポモドーロ達成。ゆっくり休んでください。",
  startBreakBtn: "休憩開始",
  startLongBreakBtn: "長い休憩を開始",
  skipKeepWorking: "スキップして作業続行",
  breakOverNotify: "休憩終了！集中する準備はできましたか？",
  eyeTips: [
    { title: "20-20-20 ルール", text: "6メートル先のものを20秒間見てください。" },
    { title: "深呼吸", text: "目を閉じて、ゆっくり5回深呼吸してください。" },
    { title: "目の回転", text: "目を時計回り、次に反時計回りに回してください。" },
    { title: "素早いまばたき", text: "素早く10回まばたきして目を潤してください。" },
    { title: "手のひらで目を覆う", text: "温かい手のひらを閉じた目の上に15秒間当ててください。" },
    { title: "遠くを見る", text: "見える最も遠いものに10秒間焦点を合わせてください。" },
    { title: "ストレッチ", text: "立ち上がって腕を上げ、肩を回してください。" },
    { title: "水分補給", text: "水を飲みましょう。目と体が喜びます。" },
  ],
  welcomeTitle: "ポモドーロ アイケア",
  welcomeDesc: "目の健康リマインダーと環境音付きの集中タイマー。TwoSetAIの無料ツール。",
  name: "名前",
  yourName: "あなたの名前",
  email: "メール",
  emailPlaceholder: "you@example.com",
  newsletterText: "購読する：",
  getStarted: "始める",
  settingUp: "設定中...",
  freeToolBy: "無料ツール by",
  openSpotify: "Spotifyで集中プレイリストを開く",
  language: "言語",
};

const ko: Translations = {
  appName: "포모도로 눈 건강",
  appTagline: "눈 건강 리마인더가 있는 집중 타이머",
  switchToLight: "라이트 모드로 전환",
  switchToDark: "다크 모드로 전환",
  buyMeACoffee: "커피 한 잔 사주기",
  ready: "준비",
  focusing: "집중 중",
  shortBreak: "짧은 휴식",
  longBreak: "긴 휴식",
  pomodorosToday: (n) => `오늘 ${n}개 포모도로`,
  cycles: (n) => `(${n} 사이클)`,
  reset: "초기화",
  startFocus: "집중 시작",
  stop: "중지",
  skipBreak: "휴식 건너뛰기",
  focus: "집중",
  breakLabel: "휴식",
  longBreakLabel: "긴 휴식",
  ambientSound: "환경음",
  off: "끄기",
  white: "백색",
  brown: "갈색",
  rain: "비",
  ocean: "파도",
  timeForEyeBreak: "눈을 쉬게 할 시간입니다!",
  longBreakTime: "긴 휴식 시간입니다!",
  stepAway: "화면에서 떨어지세요.",
  completed4: "포모도로 4개 완료. 길게 쉬어가세요.",
  startBreakBtn: "휴식 시작",
  startLongBreakBtn: "긴 휴식 시작",
  skipKeepWorking: "건너뛰고 계속 작업",
  breakOverNotify: "휴식 끝! 집중할 준비 되셨나요?",
  eyeTips: [
    { title: "20-20-20 규칙", text: "6미터 떨어진 곳을 20초 동안 바라보세요." },
    { title: "심호흡", text: "눈을 감고 천천히 5번 심호흡하세요." },
    { title: "눈 돌리기", text: "시계 방향으로, 그다음 반시계 방향으로 눈을 돌리세요." },
    { title: "빠른 깜빡임", text: "빠르게 10번 깜빡여서 눈을 촉촉하게 하세요." },
    { title: "손바닥으로 눈 덮기", text: "따뜻한 손바닥으로 감은 눈을 15초간 덮어주세요." },
    { title: "먼 곳 바라보기", text: "보이는 가장 먼 곳을 10초간 바라보세요." },
    { title: "스트레칭", text: "일어나서 팔을 위로 뻗고 어깨를 돌리세요." },
    { title: "수분 보충", text: "물을 마시세요. 눈과 몸이 고마워할 거예요." },
  ],
  welcomeTitle: "포모도로 눈 건강",
  welcomeDesc: "눈 건강 리마인더와 환경음이 있는 집중 타이머. TwoSetAI의 무료 도구.",
  name: "이름",
  yourName: "이름을 입력하세요",
  email: "이메일",
  emailPlaceholder: "you@example.com",
  newsletterText: "구독하기:",
  getStarted: "시작하기",
  settingUp: "설정 중...",
  freeToolBy: "무료 도구 by",
  openSpotify: "Spotify에서 집중 플레이리스트 열기",
  language: "언어",
};

const fr: Translations = {
  appName: "Pomodoro Soin des Yeux",
  appTagline: "Minuteur avec rappels de santé oculaire",
  switchToLight: "Mode clair",
  switchToDark: "Mode sombre",
  buyMeACoffee: "Offrez-moi un café",
  ready: "Prêt",
  focusing: "Concentration",
  shortBreak: "Pause Courte",
  longBreak: "Pause Longue",
  pomodorosToday: (n) => `${n} pomodoro${n !== 1 ? "s" : ""} aujourd'hui`,
  cycles: (n) => `(${n} cycle${n !== 1 ? "s" : ""})`,
  reset: "Réinitialiser",
  startFocus: "Commencer",
  stop: "Arrêter",
  skipBreak: "Passer la Pause",
  focus: "Concentration",
  breakLabel: "Pause",
  longBreakLabel: "Pause Longue",
  ambientSound: "Son Ambiant",
  off: "Désactivé",
  white: "Blanc",
  brown: "Brun",
  rain: "Pluie",
  ocean: "Océan",
  timeForEyeBreak: "C'est l'heure de reposer vos yeux !",
  longBreakTime: "Pause longue !",
  stepAway: "Éloignez-vous de l'écran.",
  completed4: "Vous avez complété 4 pomodoros. Prenez une longue pause.",
  startBreakBtn: "Commencer la Pause",
  startLongBreakBtn: "Commencer la Pause Longue",
  skipKeepWorking: "Passer, Continuer",
  breakOverNotify: "Pause terminée ! Prêt à vous concentrer ?",
  eyeTips: [
    { title: "Règle 20-20-20", text: "Regardez quelque chose à 6 mètres pendant 20 secondes." },
    { title: "Respiration Profonde", text: "Fermez les yeux et respirez profondément 5 fois." },
    { title: "Rotation des Yeux", text: "Faites tourner vos yeux dans le sens horaire, puis antihoraire." },
    { title: "Clignements Rapides", text: "Clignez rapidement des yeux 10 fois pour les réhydrater." },
    { title: "Paumes sur les Yeux", text: "Posez vos paumes chaudes sur vos yeux fermés pendant 15 secondes." },
    { title: "Vision au Loin", text: "Fixez l'objet le plus éloigné que vous pouvez voir pendant 10 secondes." },
    { title: "Étirement", text: "Levez-vous, étirez les bras et roulez les épaules." },
    { title: "Hydratation", text: "Buvez de l'eau. Vos yeux et votre corps vous remercieront." },
  ],
  welcomeTitle: "Pomodoro Soin des Yeux",
  welcomeDesc: "Minuteur avec rappels de santé oculaire et sons ambiants. Un outil gratuit de TwoSetAI.",
  name: "Nom",
  yourName: "Votre nom",
  email: "Email",
  emailPlaceholder: "vous@exemple.com",
  newsletterText: "S'abonner à la",
  getStarted: "Commencer",
  settingUp: "Configuration...",
  freeToolBy: "Outil gratuit de",
  openSpotify: "Ouvrir une playlist focus sur Spotify",
  language: "Langue",
};

const de: Translations = {
  appName: "Pomodoro Augenpflege",
  appTagline: "Timer mit Augengesundheits-Erinnerungen",
  switchToLight: "Heller Modus",
  switchToDark: "Dunkler Modus",
  buyMeACoffee: "Kauf mir einen Kaffee",
  ready: "Bereit",
  focusing: "Fokussiert",
  shortBreak: "Kurze Pause",
  longBreak: "Lange Pause",
  pomodorosToday: (n) => `${n} Pomodoro${n !== 1 ? "s" : ""} heute`,
  cycles: (n) => `(${n} Zyklus${n !== 1 ? "en" : ""})`,
  reset: "Zurücksetzen",
  startFocus: "Fokus Starten",
  stop: "Stopp",
  skipBreak: "Pause Überspringen",
  focus: "Fokus",
  breakLabel: "Pause",
  longBreakLabel: "Lange Pause",
  ambientSound: "Umgebungsgeräusch",
  off: "Aus",
  white: "Weiß",
  brown: "Braun",
  rain: "Regen",
  ocean: "Ozean",
  timeForEyeBreak: "Zeit für eine Augenpause!",
  longBreakTime: "Zeit für eine lange Pause!",
  stepAway: "Geh vom Bildschirm weg.",
  completed4: "Du hast 4 Pomodoros geschafft. Mach eine längere Pause.",
  startBreakBtn: "Pause Starten",
  startLongBreakBtn: "Lange Pause Starten",
  skipKeepWorking: "Überspringen, Weiterarbeiten",
  breakOverNotify: "Pause vorbei! Bereit zum Fokussieren?",
  eyeTips: [
    { title: "20-20-20 Regel", text: "Schau 20 Sekunden lang auf etwas in 6 Metern Entfernung." },
    { title: "Tiefes Atmen", text: "Schließ die Augen und atme 5 Mal tief durch." },
    { title: "Augenrollen", text: "Roll die Augen im Uhrzeigersinn, dann gegen den Uhrzeigersinn." },
    { title: "Schnelles Blinzeln", text: "Blinzle 10 Mal schnell, um die Augen zu befeuchten." },
    { title: "Handflächen auf die Augen", text: "Leg deine warmen Handflächen 15 Sekunden auf die geschlossenen Augen." },
    { title: "Fernblick", text: "Fokussiere 10 Sekunden lang das entfernteste Objekt, das du sehen kannst." },
    { title: "Dehnung", text: "Steh auf, streck die Arme und roll die Schultern." },
    { title: "Trinken", text: "Trink etwas Wasser. Deine Augen und dein Körper werden es dir danken." },
  ],
  welcomeTitle: "Pomodoro Augenpflege",
  welcomeDesc: "Fokus-Timer mit Augengesundheits-Erinnerungen und Umgebungsgeräuschen. Ein kostenloses Tool von TwoSetAI.",
  name: "Name",
  yourName: "Dein Name",
  email: "E-Mail",
  emailPlaceholder: "du@beispiel.de",
  newsletterText: "Abonniere den",
  getStarted: "Loslegen",
  settingUp: "Wird eingerichtet...",
  freeToolBy: "Kostenloses Tool von",
  openSpotify: "Fokus-Playlist auf Spotify öffnen",
  language: "Sprache",
};

const pt: Translations = {
  appName: "Pomodoro Saúde Ocular",
  appTagline: "Timer com lembretes de saúde ocular",
  switchToLight: "Modo claro",
  switchToDark: "Modo escuro",
  buyMeACoffee: "Me pague um café",
  ready: "Pronto",
  focusing: "Focando",
  shortBreak: "Pausa Curta",
  longBreak: "Pausa Longa",
  pomodorosToday: (n) => `${n} pomodoro${n !== 1 ? "s" : ""} hoje`,
  cycles: (n) => `(${n} ciclo${n !== 1 ? "s" : ""})`,
  reset: "Resetar",
  startFocus: "Iniciar Foco",
  stop: "Parar",
  skipBreak: "Pular Pausa",
  focus: "Foco",
  breakLabel: "Pausa",
  longBreakLabel: "Pausa Longa",
  ambientSound: "Som Ambiente",
  off: "Desligado",
  white: "Branco",
  brown: "Marrom",
  rain: "Chuva",
  ocean: "Oceano",
  timeForEyeBreak: "Hora de descansar os olhos!",
  longBreakTime: "Hora da pausa longa!",
  stepAway: "Afaste-se da tela.",
  completed4: "Você completou 4 pomodoros. Faça uma pausa mais longa.",
  startBreakBtn: "Iniciar Pausa",
  startLongBreakBtn: "Iniciar Pausa Longa",
  skipKeepWorking: "Pular, Continuar Trabalhando",
  breakOverNotify: "Pausa acabou! Pronto para focar?",
  eyeTips: [
    { title: "Regra 20-20-20", text: "Olhe para algo a 6 metros de distância por 20 segundos." },
    { title: "Respiração Profunda", text: "Feche os olhos e respire profundamente 5 vezes." },
    { title: "Rotação dos Olhos", text: "Gire os olhos em círculos — sentido horário, depois anti-horário." },
    { title: "Piscar Rápido", text: "Pisque rapidamente 10 vezes para reumedecer os olhos." },
    { title: "Palmas nos Olhos", text: "Coloque as palmas quentes sobre os olhos fechados por 15 segundos." },
    { title: "Foco à Distância", text: "Foque no objeto mais distante que puder ver por 10 segundos." },
    { title: "Alongamento", text: "Levante-se, estique os braços e gire os ombros." },
    { title: "Hidratação", text: "Beba água. Seus olhos e corpo vão agradecer." },
  ],
  welcomeTitle: "Pomodoro Saúde Ocular",
  welcomeDesc: "Timer com lembretes de saúde ocular e sons ambiente. Uma ferramenta gratuita da TwoSetAI.",
  name: "Nome",
  yourName: "Seu nome",
  email: "Email",
  emailPlaceholder: "voce@exemplo.com",
  newsletterText: "Assine a",
  getStarted: "Começar",
  settingUp: "Configurando...",
  freeToolBy: "Ferramenta gratuita da",
  openSpotify: "Abrir playlist de foco no Spotify",
  language: "Idioma",
};

const translations: Record<Language, Translations> = { en, zh, es, ja, ko, fr, de, pt };

export function getTranslations(lang: Language): Translations {
  return translations[lang] || en;
}
