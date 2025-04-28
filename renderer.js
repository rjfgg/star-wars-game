const planets = document.querySelectorAll('.planet');
const infoBox = document.getElementById('info-box');
const travelBtn = document.getElementById('travel-btn');
const fightBtn = document.getElementById('fight-btn');
const battleScreen = document.getElementById('battle-screen');
const healthBar = document.getElementById('health-bar');
const exitBattleBtn = document.getElementById('exit-battle-btn');
const attackBtn = document.getElementById('attack-btn');
const defendBtn = document.getElementById('defend-btn');

let health = 100;
let currentPlanet = null;
let isInBattle = false;

// 星球资源和加成数据
const planetInfo = {
    Tatooine: {
        description: "塔图因：一个干旱的沙漠星球，因双太阳而闻名。",
        resource: "沙漠矿石",
        bonus: 10
    },
    Coruscant: {
        description: "科尔萨特：银河中心，银河参议院的所在地。",
        resource: "能源晶体",
        bonus: 20
    },
    Endorse: {
        description: "霍斯：一个极寒的星球，恶劣的气候。",
        resource: "冰雪矿石",
        bonus: 15
    },
    Dagobah: {
        description: "达戈巴：一个沼泽星球，是尤达大师的隐居地。",
        resource: "植物精华",
        bonus: 25
    },
    Naboo: {
        description: "纳布：一个宁静的星球，有着美丽的风景。",
        resource: "水晶矿石",
        bonus: 30
    }
};

// 点击星球显示或隐藏简介
planets.forEach(planet => {
    let isInfoVisible = false;
    planet.addEventListener('click', (e) => {
        const planetName = e.target.getAttribute('data-name');

        // 切换简介的显示/隐藏
        if (isInfoVisible) {
            infoBox.style.display = 'none';
            isInfoVisible = false;
        } else {
            // 显示对应星球的中文简介和资源信息
            const planetData = planetInfo[planetName];
            infoBox.innerHTML = `<h3>${planetName}</h3><p>${planetData.description}</p><p>资源：${planetData.resource}</p><p>加成：恢复${planetData.bonus}点血量</p>`;
            infoBox.style.display = 'block';
            isInfoVisible = true;
        }
    });
});

// 旅行按钮功能：将角色移动到所选星球附近
travelBtn.addEventListener('click', () => {
    if (currentPlanet) {
        const planet = document.querySelector(`.planet[data-name="${currentPlanet}"]`);
        const planetRect = planet.getBoundingClientRect();
        const player = document.getElementById('player');

        // 将角色定位到星球附近
        player.style.left = `${planetRect.left + planetRect.width}px`; // 星球旁边
        player.style.top = `${planetRect.top + planetRect.height / 2 - player.clientHeight / 2}px`; // 垂直居中
    }
});

// 战斗按钮：显示战斗界面
fightBtn.addEventListener('click', () => {
    isInBattle = true;
    battleScreen.style.display = 'block';
    fightBtn.style.display = 'none';
    exitBattleBtn.style.display = 'block';
});

// 退出战斗按钮
exitBattleBtn.addEventListener('click', () => {
    isInBattle = false;
    battleScreen.style.display = 'none';
    fightBtn.style.display = 'block';
    exitBattleBtn.style.display = 'none';
});

// 攻击按钮
attackBtn.addEventListener('click', () => {
    //alert("你攻击了敌人！");
});

// 防御按钮
defendBtn.addEventListener('click', () => {
    //alert("你防御了敌人的攻击！");
});

// 双击星球拾取资源并恢复血量
planets.forEach(planet => {
    planet.addEventListener('dblclick', (e) => {
        const planetName = e.target.getAttribute('data-name');
        const planetData = planetInfo[planetName];

        // 恢复血量
        collectResource(planetData.bonus);
    });
});

// 恢复血量
function collectResource(amount) {
    health += amount;
    if (health > 100) health = 100;
    healthBar.textContent = `Health: ${health}`;
}
const socket = io();

// 监听服务器发送的消息
socket.on('message', (data) => {
    // 处理接收到的消息
    console.log('Received message:', data);
});

// 发送消息到服务器
function sendMessage(data) {
    socket.emit('message', data);
}

// 示例：在点击星球时发送消息
const planets = document.querySelectorAll('.planet');
planets.forEach(planet => {
    planet.addEventListener('click', (e) => {
        const planetName = e.target.getAttribute('data-name');
        sendMessage({ type: 'planet-click', planetName });
    });
});