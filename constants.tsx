
import { Accommodation, ItineraryDay, SpotCategory, TDACStep, AppCategory } from './types';

export const TRIP_DETAILS = {
  title: "Bangkok Trip 2026 🇹🇭",
  subtitle: "2026貴婦曼谷呼麻群",
  dates: "1/30 - 2/4",
  flight: {
    outbound: { date: "1/30 (Fri)", dep: "21:55", arr: "00:25", from: "KHH", to: "DMK T1", flightNo: "FD242 (泰亞航)" },
    inbound: { date: "2/4 (Wed)", dep: "05:10", arr: "09:45", from: "DMK T1", to: "KHH", flightNo: "FD243 (泰亞航)" }
  },
  roomsConfig: "需求：2+2+1 房型"
};

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 1,
    name: "Mocca Hotel",
    engName: "Mocca Hotel (莫卡飯店)",
    nights: "1 Night (1/30 - 1/31)",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    address: "371/45 Saranakom 2, Songprapha Road (Don Mueang)",
    note: "✈️ 紅眼班機補眠專用，離 DMK 機場10分鐘。",
    url: "https://www.google.com/maps/search/?api=1&query=Moca+Hotel+Bangkok",
    status: "Confirmed 已確認",
    tags: ["Near Airport", "Transit"],
    roomConfig: "2 Rooms (3+2)"
  },
  {
    id: 2,
    name: "Airbnb",
    engName: "民宿",
    nights: "4 Nights (1/31 - 2/4)",
    checkInTime: "12:00",
    checkOutTime: "12:00 (2/4)",
    address: "169 Soi Sabai Chai 13, Huai Khwang, Bangkok 10310",
    note: "🛁 策略成功：多訂 2/3 這一晚！Day 4 逛完舊城區回這洗澡，半夜 23:30 優雅退房去機場。",
    url: "https://www.google.com/maps/search/?api=1&query=169+Soi+Sabai+Chai+13+Huai+Khwang+Bangkok",
    status: "Confirmed 已確認",
    tags: ["Airbnb", "Relax & Shower"],
    roomConfig: "2+2+1 房型"
  }
];

export const ITINERARY: ItineraryDay[] = [
  {
    day: "Day 0",
    date: "1/30 (Fri)",
    title: "Departure 出發日",
    events: [
      { time: "21:55", title: "Flight from KHH 🛫", icon: "Plane", desc: "高雄起飛，帶著好心情出發！", url: "https://www.google.com/maps/search/?api=1&query=Kaohsiung+International+Airport" },
      { time: "00:25", title: "Arrival at DMK", icon: "MapPin", desc: "抵達曼谷廊曼機場，搭 Grab/Bolt 前往 Mocca Hotel 休息。", url: "https://www.google.com/maps/search/?api=1&query=Don+Mueang+International+Airport" }
    ]
  },
  {
    day: "Day 1",
    date: "1/31 (Sat)",
    title: "Market & Vintage 市集與復古",
    events: [
      { time: "10:00", title: "Check-out & Move", icon: "Home", desc: "前往 Huai Khwang Airbnb 寄放行李 (169 Soi Sabai Chai 13)。" },
      { 
        time: "11:30", 
        title: "Chatuchak Market", 
        sub: "恰圖恰週末市集", 
        icon: "ShoppingBag", 
        desc: "🥥 放完行李直接搭 MRT 去逛，必吃椰子冰、蒜頭麵包。", 
        url: "https://www.google.com/maps/search/Chatuchak+Weekend+Market/@13.775677,100.5054731,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDEyMC4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D" 
      },
      { 
        time: "16:00", 
        title: "Siam Paragon", 
        sub: "暹羅百麗宮", 
        icon: "ShoppingBag", 
        desc: "💎 從恰圖恰 (Mo Chit) 搭 BTS 直達 Siam。進去感受曼谷貴婦百貨，順便去超市買點零食。\n🧸 6樓有蒙奇奇，ＺＯＥ要代購", 
        url: "https://maps.app.goo.gl/XmLBthEQ8r3xdfDDA" 
      },
      { 
        time: "19:30", 
        title: "Asiatique Riverfront", 
        sub: "河濱夜市 & 晚餐", 
        icon: "Utensils", 
        desc: "🎡 晚餐在夜市解決，欣賞昭披耶河畔夜景。", 
        url: "https://maps.app.goo.gl/4ZFLRx12mLbAVSu8A" 
      },
      { 
        time: "21:00", 
        travelTime: "🚶 步行 1 分鐘", 
        title: "Skyflyers Swing", 
        sub: "36層高巨型鞦韆", 
        icon: "Map", 
        desc: "🎢 挑戰膽量！全新開幕亞太最高(135m)鞦韆，雙腳懸空俯瞰曼谷！", 
        url: "https://maps.app.goo.gl/UD9CfvMc5sACAheH9" 
      },
      { 
        time: "23:00", 
        title: "體驗泰式古法按摩", 
        thai: "นวดแผนไทย (Nuad Phaen Thai)", 
        icon: "Sparkles", 
        desc: "💆‍♀️ Day 1 結尾！隨便找一家 體驗「正宗泰式古法按摩」，按完直接回民宿睡覺。" 
      }
    ]
  },
  {
    day: "Day 2",
    date: "2/1 (Sun)",
    title: "Old Town & Night View 舊城與夜景",
    events: [
      { 
        time: "10:30", 
        travelTime: "🚕 車程約 35 分鐘", 
        title: "Song Wat Road", 
        sub: "嵩越路老街", 
        icon: "Camera", 
        desc: "🎞️ ✨泰國年輕人近期最愛逛的地方，曼谷最潮老街！ 這邊很好拍也很多文青小店可以逛 必逛 Oyster & Things (選物店)、FV Cafe，拍王家衛風格大片", 
        url: "https://maps.app.goo.gl/JzNybj51GhxVL5EM8" 
      },
      { 
        time: "12:30", 
        travelTime: "🚶 步行可達", 
        title: "COPENN. Song Wat", 
        sub: "嵩越路店", 
        icon: "Droplets", 
        desc: "🕯️ 泰國近期有名的線香、蠟燭、香氛專賣店。精緻質感的香氛小物，超適合當伴手禮！", 
        url: "https://maps.app.goo.gl/67fiiPTeZjxnpjhA9" 
      },
      { 
        time: "13:30", 
        travelTime: "🚕 車程約 20 分鐘", 
        title: "Butterfly Thai Costume", 
        sub: "鄭王廟泰服推薦", 
        icon: "Camera", 
        desc: "🙏 指定推薦！網路上評價超好的泰服店，款式多又乾淨。換完裝直接去鄭王廟拍大片。", 
        url: "https://maps.app.goo.gl/ToEftWqxJa1djX1Q6" 
      },
      { 
        time: "14:00", 
        travelTime: "🚶 步行/搭船", 
        title: "Wat Arun", 
        sub: "鄭王廟", 
        icon: "Camera", 
        desc: "🙏 拍出人生美照！建議停留 1-1.5 小時。", 
        url: "https://maps.app.goo.gl/1pA9uYLwWGzGCqrg6" 
      },
      { 
        time: "16:00", 
        travelTime: "🚕 車程約 30 分鐘", 
        title: "Dusit Central Park", 
        sub: "2026全新地標", 
        icon: "Trees", 
        desc: "🌳 曼谷最新地標！就在 Lumpini Park 對面，結合購物與絕美空中花園 (Roof Park)，一定要來打卡！ 翁主任指定想去逛", 
        url: "https://maps.app.goo.gl/1G3es3aFJK2b7k3v9" 
      },
      { 
        time: "17:30", 
        title: "泰式放鬆按摩", 
        thai: "นวดแผนไทย (Nuad Phaen Thai)", 
        icon: "Sparkles", 
        desc: "💆‍♀️ 逛完公園腿痠了看附近有沒有 放鬆按摩。" 
      },
      { 
        time: "19:00", 
        travelTime: "🚶 步行/車程約 10 分鐘", 
        title: "Mahanakhon SkyWalk", 
        sub: "74樓高空酒吧", 
        icon: "Moon", 
        desc: "🌃 欣賞曼谷璀璨夜景！踩在 314 米高空玻璃棧道，俯瞰百萬燈火。\n🎟️ 訂票連結：https://s.klook.com/c/VX5bGzJWXD", 
        url: "https://maps.app.goo.gl/askXLXohFpJ7huKh8" 
      },
      { 
        time: "20:30", 
        travelTime: "🚕 車程約 10 分鐘", 
        title: "Crimson Room", 
        sub: "Jazz Bar", 
        icon: "Music", 
        desc: "🎷像1920年代的好萊屋百老匯爵士劇院中，紅絲絨布幕、水晶燈、劇院階梯", 
        url: "https://maps.app.goo.gl/r8ofpE8zkVoi4kCK7" 
      },
      { 
        time: "22:30", 
        travelTime: "🚕 車程約 25 分鐘", 
        title: "Sing Sing Theater", 
        sub: "復古上海風夜店", 
        icon: "Music", 
        desc: "💃 續攤！曼谷最美夜店，復古上海灘風格，好拍又好玩 (Phrom Phong)。", 
        url: "https://maps.app.goo.gl/TNHgmabS3uQfp6Zd8" 
      }
    ]
  },
  {
    day: "Day 3",
    date: "2/2 (Mon)",
    title: "Relax & Thong Lo 悠閒通羅",
    events: [
      { 
        time: "11:30", 
        travelTime: "🚕 車程約 30 分鐘", 
        title: "The Commons Thong Lo", 
        sub: "早午餐推薦", 
        icon: "Utensils", 
        desc: "🍳 睡飽飽來這吃 Brunch！曼谷最美清水模商場，推薦頂樓 Roast 吃早午餐，樓下 Roots 喝咖啡。", 
        url: "https://maps.app.goo.gl/iHUkRknDP8VUzoo37" 
      },
      { 
        time: "14:00", 
        travelTime: "🚕 車程約 20 分鐘", 
        title: "HUUS PLATE", 
        sub: "BTS Bang Chak (Optional)", 
        icon: "Coffee", 
        desc: "☕ 網美必去！由老房子改建的超美韓系咖啡廳，適合拍網美照，有很多周邊可以逛。", 
        url: "https://maps.app.goo.gl/DG2stD2wYag8ujEb7" 
      },
      { 
        time: "16:00", 
        travelTime: "🚕 車程約 15 分鐘", 
        title: "MADBACON", 
        sub: "Sukhumvit 49", 
        icon: "ShoppingBag", 
        desc: "🛍️ 前往 Thong Lo！這整個區域都是文青複合式小店，可各逛各的。翁主任累了可以找一間坐著喝休息", 
        url: "https://maps.app.goo.gl/xkZSD49McZigyBfG7" 
      },
      { 
        time: "17:00", 
        travelTime: "🚶 步行約 5 分鐘", 
        title: "BENKOFF", 
        sub: "Thong Lo", 
        icon: "Coffee", 
        desc: "🐶 必拍門口！記得逛臘腸狗吊飾。ＺＯＥ老師要代購盲盒", 
        url: "https://maps.app.goo.gl/RJ8CobDo2oaRBATf9" 
      },
      { 
        time: "18:00", 
        travelTime: "🚶 步行約 10 分鐘", 
        title: "Thong Lo Spa", 
        sub: "通羅區高級按摩", 
        thai: "นวดประคบสมุนไพร (Nuad Prakob Samunphrai)",
        icon: "Sparkles", 
        desc: "💆‍♀️ 推薦 Let's Relax 或 Asia Herb 的「草藥球泰式按摩」。" 
      },
      { 
        time: "20:00", 
        travelTime: "🚶 步行約 5 分鐘", 
        title: "Raze Arcade", 
        sub: "F1 Bar", 
        icon: "Music", 
        desc: "🏎️ 賽車模擬酒吧 (The Piman 49)。 Ｆ1模擬酒吧，半夜免費玩兩小時", 
        url: "https://maps.app.goo.gl/Gq5pKqKsvzCoUMyBA" 
      },
      { 
        time: "22:00", 
        travelTime: "🚕 車程約 15 分鐘", 
        title: "Nana Plaza", 
        sub: "知名夜生活地標", 
        icon: "Zap", 
        desc: "💃 曼谷傳奇紅燈區！來感受熱鬧氛圍 (Sukhumvit Soi 4)。", 
        url: "https://maps.app.goo.gl/CKwARBJ93Qmu6Lsu8" 
      }
    ]
  },
  {
    day: "Day 4",
    date: "2/3 (Tue)",
    title: "Shopping & Relax 購物與休息",
    events: [
      { 
        time: "10:30", 
        travelTime: "🚕 車程約 35 分鐘", 
        title: "Fran's Sathorn", 
        sub: "Brunch 早午餐", 
        icon: "Utensils", 
        desc: "🥓 睡飽一點再來吃厚切培根 & 絲絨蛋！補充體力準備血拼。", 
        url: "https://maps.app.goo.gl/JsuT2kqJiqFKJZag7" 
      },
      { 
        time: "13:30", 
        travelTime: "🚕 車程約 20 分鐘", 
        title: "Blendies Thailand", 
        sub: "Siam Square", 
        icon: "Utensils", 
        desc: "🍦 翁主任的愛！必吃開心果冰淇淋 (Pistachio)，就在 Siam Square。", 
        url: "https://maps.app.goo.gl/dccj1zc2xpMRcwrd9" 
      },
      { 
        time: "14:00", 
        travelTime: "🚶 步行 1 分鐘", 
        title: "Dalmatian", 
        sub: "Siam Square", 
        icon: "Coffee", 
        desc: "🐩 就在隔壁！喝杯斑點狗咖啡，或順便拍個照。", 
        url: "https://maps.app.goo.gl/2RC4HnkyiqwRgm2P6" 
      },
      { 
        time: "15:00", 
        travelTime: "🚶 步行約 10 分鐘", 
        title: "Central World", 
        sub: "中央世界購物中心", 
        icon: "ShoppingBag", 
        desc: "🛍️ 最後衝刺！Gentlewoman、香氛區一次買齊。", 
        url: "https://maps.app.goo.gl/8WTJLDnYVBa3nRQQ6" 
      },
      { 
        time: "16:00", 
        travelTime: "🚶 步行 (Central World 1F)", 
        title: "Karmakamet", 
        sub: "Groove Zone", 
        icon: "Droplets", 
        desc: "🕯️【新增】泰國必買！香氛控的秘密基地。推薦：傳統香包、白茶/摩洛哥薄荷精油。" 
      },
      { 
        time: "17:30", 
        travelTime: "🚶 步行約 5 分鐘", 
        title: "Big C Supercenter", 
        sub: "Big C 超市", 
        icon: "ShoppingBag", 
        desc: "🛒 就在 Central World 對面！買零食伴手禮最方便，買完直接回飯店。", 
        url: "https://maps.app.goo.gl/S45E6ZTBRSJfB1bb7" 
      },
      { 
        time: "20:00", 
        travelTime: "🚕 車程約 25 分鐘", 
        title: "Back to Airbnb", 
        sub: "Huai Khwang", 
        icon: "ShowerHead", 
        desc: "🛁 回民宿洗澡、整理戰利品、最後打包。", 
        url: "https://www.google.com/maps/search/?api=1&query=169+Soi+Sabai+Chai+13+Huai+Khwang+Bangkok"
      },
      { 
        time: "21:30", 
        travelTime: "🚶 步行約 5 分鐘", 
        title: "Last Thai Massage", 
        sub: "最後一按", 
        thai: "นวดแผนไทย (Nuad Phaen Thai)",
        icon: "Sparkles", 
        desc: "💆‍♀️ 上飛機前鬆一下！來場 2 小時的「傳統泰式按摩」拉筋伸展，舒舒服服去機場。" 
      },
      { 
        time: "23:30", 
        travelTime: "🚕 車程約 30 分鐘", 
        title: "Go to Airport", 
        icon: "Plane", 
        desc: "👋 退房叫車去 DMK 機場 (05:10 飛機)。" 
      }
    ]
  },
  {
    day: "Day 5",
    date: "2/4 (Wed)",
    title: "Return Home 回程",
    events: [
      { 
        time: "05:10", 
        title: "Flight to KHH 🛫", 
        icon: "Plane", 
        desc: "搭機返回高雄，結束曼谷贵婦之旅！", 
        url: "https://www.google.com/maps/search/?api=1&query=Don+Mueang+International+Airport" 
      },
      { 
        time: "09:45", 
        title: "Arrival at KHH", 
        icon: "MapPin", 
        desc: "抵達高雄小港國際機場。", 
        url: "https://www.google.com/maps/search/?api=1&query=Kaohsiung+International+Airport" 
      }
    ]
  }
];

export const SPOTS: SpotCategory[] = [
  {
    category: "Song Wat Road 嵩越路特輯 🎞️",
    note: "📅 安排在 Day 2 (週日) 上午前往",
    items: [
      { name: "COPENN.", area: "Day 2", url: "https://maps.app.goo.gl/67fiiPTeZjxnpjhA9", desc: "工業風香氛 (必逛) Scent & Design 🕯️" },
      { name: "e-ga LAB", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=e-ga+LAB+Song+Wat", desc: "甜點/餐廳 Cake & Dining 🍰" },
      { name: "SCR Coffee", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Song+Wat+Coffee+Roasters", desc: "咖啡店 Coffee Roasters ☕" },
      { name: "SAAN SONGWAT", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=SAAN+SONGWAT", desc: "禮品店 Gift Shop 🎁" },
      { name: "Clay Songwat", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Clay+Songwat", desc: "陶瓷餐具 Ceramics 🍽️" },
      { name: "Get Back & Jude", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Get+Back+and+Jude+Records", desc: "古著/黑膠 Vintage & Vinyl 📷" },
      { name: "The Old Breadshop", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=The+Old+Breadshop+Song+Wat", desc: "麵包店 Bakery 🍞" },
      { name: "Oyster & Things", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Oyster+and+Things+Song+Wat", desc: "飾品/擺件 Decor & Props 🦪" },
      { name: "Wabi's", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Wabi's+Song+Wat", desc: "烘焙坊 Home Bakery 🥐" },
      { name: "onest", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=onest+at+Song+Wat", desc: "香氛/洗護 Scent & Care 🧴" },
      { name: "MAISON DE AURI", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=MAISON+DE+AURI", desc: "帆布包 Canvas Bags 👜" },
      { name: "Wanjai Cafe", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Wanjai+Cafe+House", desc: "芒果糯米飯 Mango Sticky Rice 🥭" },
      { name: "Urai Goose", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Urai+Braised+Goose", desc: "滷鵝 (米其林) Braised Goose 🦢" },
      { name: "Gu Long Bao", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Gu+Long+Bao", desc: "古籠包 Steamed Buns 🥟" },
      { name: "BLACK 777", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=BLACK+777+Song+Wat", desc: "泰式餐廳 Thai Food 🥗" },
      { name: "Pink Rabbit", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Pink+Rabbit+Bob+Song+Wat", desc: "蛋糕甜點店 Cake Shop 🐰" }
    ]
  },
  {
    category: "Cafe & Food 美食 🧸",
    items: [
      { name: "MADBACON", area: "Day 3", url: "https://www.google.com/maps/search/?api=1&query=MADBACON+Bangkok", desc: "Thong Lo | 文創小店" },
      { name: "baskproject", area: "Day 3", url: "https://www.google.com/maps/search/?api=1&query=baskproject+Bangkok", desc: "Thong Lo | 韓系奶油風✨" },
      { name: "BENKOFF", area: "Day 3", url: "https://www.google.com/maps/search/?api=1&query=BENKOFF+Bangkok", desc: "Thong Lo | 臘腸狗吊飾！🐶" },
      { name: "The Commons", area: "Day 3", url: "https://www.google.com/maps/search/?api=1&query=The+Commons+Thong+Lo", desc: "Thong Lo | 最美清水模商場 Brunch 🍳" },
      { name: "HUUS PLATE", area: "Day 3 (Optional)", url: "https://www.google.com/maps/search/?api=1&query=HUUS+PLATE", desc: "Bang Chak | 超美韓系獨棟咖啡廳 ☕" },
      { name: "Fran's", area: "Day 4", url: "https://www.google.com/maps/search/?api=1&query=Fran's+Sathorn", desc: "早午餐 | 必點厚切培根 🥓" },
      { name: "Blendies", area: "Day 4", url: "https://www.google.com/maps/search/?api=1&query=Blendies+Thailand", desc: "Siam | 開心果冰淇淋 🍦" },
      { name: "Dalmatian", area: "Day 4", url: "https://www.google.com/maps/search/?api=1&query=Dalmatian+Siam+Square", desc: "Siam | 斑點狗咖啡 🐩" },
      { name: "Potato Corner", area: "Day 4", url: "https://www.google.com/maps/search/?api=1&query=Potato+Corner+Central+World", desc: "CTW | 超人氣薯條 🍟" }
    ]
  },
  {
    category: "Night & Bar 酒吧 🥂",
    items: [
      { name: "Mahanakhon Sky Walk", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Mahanakhon+SkyWalk", desc: "Silom | 最高玻璃觀景台 🌅" },
      { name: "Crimson Room", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Crimson+Room+Bangkok", desc: "Langsuan | Gatsby 爵士風 🎷" },
      { name: "Raze Arcade", area: "Day 3", url: "https://www.google.com/maps/search/?api=1&query=Raze+Arcade", desc: "Thong Lo | F1 賽車酒吧 🏎️" },
      { name: "Nana Plaza", area: "Day 3", url: "https://www.google.com/maps/search/?api=1&query=Nana+Plaza+Bangkok", desc: "Nana | 知名夜生活地標 💃" }
    ]
  },
  {
    category: "Clubbing 夜店 💃",
    items: [
      { name: "Sing Sing", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Sing+Sing+Theater", desc: "Phrom Phong | 復古上海風" },
      { name: "ELYSIUM", area: "Optional", url: "https://www.google.com/maps/search/?api=1&query=ELYSIUM+Immersive+Club+Bangkok", desc: "Emsphere | 全新沉浸式 ✨" },
      { name: "Route 66", area: "Optional", url: "https://www.google.com/maps/search/?api=1&query=Route+66+Bangkok", desc: "RCA | 經典嗨咖" },
      { name: "Onyx", area: "Optional", url: "https://www.google.com/maps/search/?api=1&query=Onyx+Bangkok", desc: "RCA | 百大電音 EDM" },
      { name: "Spaceplus", area: "Optional", url: "https://www.google.com/maps/search/?api=1&query=Spaceplus+Bangkok", desc: "RCA | 科技未來感" }
    ]
  },
  {
    category: "Sightseeing 景點 🎡",
    items: [
      { name: "Chatuchak", area: "Day 1", url: "https://www.google.com/maps/search/?api=1&query=Chatuchak+Market", desc: "週末市集 | 椰子冰必吃 🛍️" },
      { name: "Skyflyers", area: "Day 1", url: "https://www.google.com/maps/search/?api=1&query=Skyflyers+Asiatique", desc: "Asiatique | 36層樓高鞦韆 🎢" },
      { name: "Butterfly Thai Costume", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Butterfly+Thai+Costume", desc: "Old Town | 泰服租借推薦 🙏" },
      { name: "Dusit Central Park", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Dusit+Central+Park", desc: "Silom | 2026新地標！空中花園 🌳" }
    ]
  },
  {
    category: "Shopping 購物 🛒",
    items: [
      { name: "COPENN.", area: "Day 2", url: "https://maps.app.goo.gl/67fiiPTeZjxnpjhA9", desc: "Song Wat | 工業風香氛 🕯️" },
      { name: "Karmakamet", area: "Day 4", url: "https://www.google.com/maps/search/?api=1&query=Karmakamet+Central+World", desc: "CTW | 香氛控必買 🔥" },
      { name: "Oyster & Things", area: "Day 2", url: "https://www.google.com/maps/search/?api=1&query=Oyster+and+Things", desc: "Song Wat | 可愛選物 🦪" },
      { name: "FRANK Garcon", area: "Day 4", url: "https://www.google.com/maps/search/?api=1&query=FRANK+Garcon+Siam", desc: "Siam | 設計師選物 🧢" },
      { name: "Karmakamet (Groove Zone)", area: "Day 4", url: "https://www.google.com/maps/search/?api=1&query=Karmakamet+Central+World", desc: "CTW | 高級香氛 🕯️" },
      { name: "Big C", area: "Day 4", url: "https://www.google.com/maps/search/?api=1&query=Big+C+Supercenter+Ratchadamri", desc: "CTW | 伴手禮好朋友 🍫" }
    ]
  }
];

export const CHECKLIST = [
  "護照 Passport (效期6個月以上) & 影本",
  "網卡 / 漫遊 SIM Card",
  "泰銖現金 (先換 2-3000 備用)",
  "下載 Grab / Bolt (綁定信用卡)",
  "旅遊保險單",
  "個人藥品 (腸胃/止痛/暈車)",
  "行動電源 (充飽)",
  "牙刷/牙膏",
  "無肩帶內衣/胸貼 (泰服備用)",
  "好走的球鞋 (日走萬步)",
  "薄外套 (冷氣強)",
  "大購物袋 (Big C 掃貨用)",
  "髮捲/離子夾 (110v-220v通用)",
  "防曬乳/墨鏡/雨傘"
];

export const TDAC_STEPS: TDACStep[] = [
  { step: 1, title: "Preparation 準備資料", content: "護照、電子機票、泰國飯店英文地址、Email。", icon: "Book" },
  { step: 2, title: "Personal Info 基本個資", content: "填寫英文姓名、護照號碼、國籍 (Taiwan)。", icon: "Users" },
  { step: 3, title: "Flight & Hotel 航班與住宿", content: "填寫去回程航班與第一晚飯店地址。", icon: "Plane" },
  { step: 4, title: "Screenshot 截圖保存", content: "收到 QR Code 後務必截圖存在手機相簿。", icon: "Camera" }
];

export const APP_CATEGORIES: AppCategory[] = [
  {
    title: "翻譯 APP 🗣️",
    apps: [
      { name: "Google 翻譯", image: "https://i.ibb.co/hF2tzxWb/400x400bb-75.webp", desc: "拍照翻譯菜單、語音對話。", url: "https://apps.apple.com/app/id414706506" },
      { name: "Kuli Kuli", image: "https://i.ibb.co/Zpg8ThYp/400x400bb-75-1.webp", desc: "AI 泰文字幕/菜單翻譯。", url: "https://apps.apple.com/app/id6458146511" }
    ]
  },
  {
    title: "交通/叫車 APP 🚕",
    apps: [
      { name: "foodpanda", image: "https://i.ibb.co/HT0MmZLm/400x400bb-75-2.webp", desc: "泰國外送美食首選。", url: "https://www.foodpanda.co.th/" },
      { name: "Grab", image: "https://i.ibb.co/8DsYDZqV/400x400ia-75.webp", desc: "最強叫車/外送 App。", url: "https://apps.apple.com/app/id647268330" },
      { name: "Bolt", image: "https://i.ibb.co/QF9xKfTt/400x400bb-75-3.webp", desc: "更便宜的叫車方案。", url: "https://apps.apple.com/app/id675033630" }
    ]
  },
  {
    title: "交通工具 APP 🚇",
    apps: [
      { name: "曼谷地鐵通", image: "https://i.ibb.co/JF0XR4xr/400x400bb-75-4.webp", desc: "詳細路線圖、換車方案。", url: "https://apps.apple.com/app/id1497901123" },
      { name: "ViaBus", image: "https://i.ibb.co/Q7Z65hx4/400x400bb-75-5.webp", desc: "即時公車位置查詢。", url: "https://apps.apple.com/app/id1074208600" }
    ]
  }
];
