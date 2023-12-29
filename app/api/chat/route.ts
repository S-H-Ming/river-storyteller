// route.ts Route Handlers
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge"; // Provide optimal infrastructure for our API route (https://edge-runtime.vercel.app/)

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// all rivers id
// https://rivercare.plurality.moda.gov.tw/api/rivers

async function getTsenwenRiverDataAPI(contract?: string) {
  const defaultContract = "KT1XXF4fBXjBEjdjcV5qAJxJhCiyUaCzxnjc";
  const res = await fetch(
    `https://rivercare.plurality.moda.gov.tw/api/rivers/${
      contract ? contract : defaultContract
    }`
  );
  return res.json();
}

async function getTsenwenRiverStoryAPI(ipfsHash?: string) {
  const res = await fetch(
    `https://testnets.akaswap.com/ipfs/${ipfsHash}`
  );
  return res.json();
}

var RiverData = {
  description: "",
  datasetIpfsHash: "",
  story1: "",
  story2: "",
  story3: "",
};

// POST localhost:3000/api/chat
export async function POST(request: Request) {
  // console.log("river data: ");
  // console.log({RiverData});

  const { messages, contract } = await request.json(); // { messages: [] }

  //Fetching RiverData
  const data = await getTsenwenRiverDataAPI(contract);

  RiverData.datasetIpfsHash = data.dataset.split("ipfs://")[1] || "QmaJnnprvwaD9kjszq2UoJYE8bwWeXJFTwdTkMwirAL55i"

  RiverData.description =
    data.description ||
    "曾文溪是台灣的第四大河流，全長約138公里，發源於中央山脈的中央尖山，流經嘉義縣、台南市、屏東縣等地，最終注入台灣海峽。曾文溪對台灣的農業和水資源有著重要的影響，同時也是一個重要的生態系統，支持著豐富的濕地生態環境。然而，由於長期的人類活動和開發，曾文溪也面臨著一些環境挑戰。曾文溪孕育了上游的鄒族文化，以及下游的嘉南沖積平原。中游丘陵水力資源豐富，水庫密集，全台灣最大的曾文水庫坐落其間，其湖面面積達十七平方公里。";

  // Fetching Dataset
  const story = await getTsenwenRiverStoryAPI(RiverData.datasetIpfsHash);

  RiverData.story1 =
    story.story[0].text ||
    "嘉義茶山的山川間，有一位鄒族獵人Moe Yasiyungu，又名安孝明。他長期在茶山國小教導特色文化課程，舉辦鄒族傳統文化營隊活動，彷彿是這塊土地上的文化守護者。有一天，他問從城市的來山上參加營隊的小朋友：“在你家附近的溪流，你敢不敢玩水？很髒不敢玩的話，那為什麼會那麼髒呢？”這個問題貼近孩子的自身經驗，又激起了孩子們對水環境的好奇。他開始分享，鄒族小朋友在山上是不怕水的。他們的畢業典禮在珈雅瑪瀑布舉行，茶山國小只有13名學生。畢業生必須游泳到珈雅瑪瀑布下才能拿到獎品，而典禮結束後，全校師生一起打水仗，共享水的歡樂。安孝明説，大人們從小教導他們，玩水前要先破壞「水鬼的陷阱」。這裡的「ohcu」是鄒語「沈沒、淹沒」的意思，而水鬼被稱為「e'ngohcu」，是專門害人淹水的鬼。這些水鬼總在小朋友玩水的地方設陷阱，企圖抓住他們。對付水鬼的方法是在下水前，先撿拾石頭向水中砸，目的是要轟炸跟破壞水鬼設下的陷阱。同時，透過石頭落水的聲響，可以判斷水深。水淺的地方，石頭落水是「啪」地一聲；水深處，石頭落水是「澎隆」的聲音。這是鄒族人的智慧，對小孩來說，也是帶著警示意味的親水遊戲與教育。每每帶著小朋友到溪邊，安孝明總提醒他們先不要急著下水，問他們要記得先做什麼？孩子們高舉起石頭，群起回應：“轟炸水鬼的陷阱！”這樣的傳統智慧在遊戲中得以傳承，成為了親水教育的一部分。這就是山間的故事，一場關於水、文化和智慧的奇妙冒險。";
  RiverData.story2 =
    story.story[1].text ||
    "曾文溪，是這片土地上的生命之水，見證著歷史的更迭，包容著人類的活動。在曾文溪的流域中，有一段特別的故事，那就是福山壩的誕生。在溪的上游，政府早期為了攔截砂石，建造了六座宏偉的大壩，而福山壩就是這其中的一座。曾文溪上游數個攔砂壩，包括達邦壩、達德安壩、福山壩、樂野壩、里佳壩及大埔壩，這些在1972年曾文水庫啟用後興建的水利工程，前5個位於鄒族傳統領域。這些壩體原本是為了攔阻砂石沉積而存在，然而，它們不僅破壞了河川洄游生態，也讓世居於此的鄒族人生活樣貌被迫改變。如今，這些大壩已經早已失去原設計功能，歷經自然沖刷切割，壩體留下許多水石雕琢的密碼。這些宏偉的建築物赫然已與在地環境融為一體，成為一座座自然化的人造紀念碑。這些紀念碑不僅是水利工程的痕跡，更是歷史的見證者，承載著曾文溪上游的故事。曾文溪流域的變遷，如同一幅不斷變換的畫卷，而福山壩及其他攔砂壩則是這幅畫卷中獨特的一頁，留下了人類與自然共生的痕跡。";
  RiverData.story3 =
    story.story[2].text ||
    "大地藝術季策展團隊在踏查階段，深入最靠近曾文溪的拔林火車站週邊與社區耆老及農人夥伴們互動，並邀台南藝術大學藝術創作理論研究所博士生、材質創作與設計系共六十多位年輕創作者，組成9組創作隊伍，歷經3個多月進駐渡拔里拔仔林的賴姓宗祠與居民互動，舉辦包括藍染工作坊、社區食譜、取土燒窯創作等各項活動。在拔林社區，這個學期的驚喜之旅包含了一場意外的美食冒險，那就是與芒果控肉有關的故事。學生們受邀到拔林賴氏七代宗祠工作，展開了一場充滿創意的「芒果焢肉」之旅。原本只是一個小社區，學生們穿梭在社區中，進行各種社區參與活動。他們踏入拔林賴氏七代宗祠，開始了一場驚喜的烹飪體驗。一位原本懶洋洋的大男生，竟然是個擁有豐富美食知識的美食家。他與他的助手們化身廚藝高手，一邊進行木工、焊接等工作，一邊烹製美味的芒果焢肉。這一場香氣四溢的課堂中，各種才藝交相輝映。木工、焊接、刷漆、藍染實驗，還有美食的烹調，所有的活動在宗祠內交織出一幕幕生動的畫面。而那位懶洋洋的大男生和他的女友助手，則在廚房中嫻熟地剝蒜、拔豬毛、切蔥段、削芒果、起油鍋、下調味，一步步完成芒果焢肉的烹製。這次的美食之旅成了一場令人難以忘懷的社區互動。原本只是學習木工、焊接的一群學生，竟然在這片小地方挖掘出了美食的秘密。這不僅是一場烹飪課，更是一次對當地味蕾的探索，充滿著香氣和驚喜。社區裡的美食冒險，成了學生們學習的一部分，也為這段時光增添了美好的回憶。";
  
  let response;

  if (
    (messages[messages.length - 1].role === "user" &&
      (messages[messages.length - 1].content.includes("rock") ||
        messages[messages.length - 1].content.includes("石頭"))) ||
    messages[messages.length - 1].content.includes("石頭")
  ) {
    console.log("判斷：yes");

    // change this to decide when to trigger the rock
    response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "assistant",
          content:
            "You are a rock living on the river in Tainan, Taiwan. You are a facilitator and promote good activities for keeping good health of the river. Start each message with, 'As a rock'.",
        },
        ...messages,
      ],
    });
  } else {
    response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content: `You are an AI storyteller embodying the Tsen-wen River in Tainan, Taiwan, communicating exclusively in Traditional Mandarin or 繁體中文. Describe the river as ${RiverData.description} and narrate engaging stories, such as ${RiverData.story1}, ${RiverData.story2}, and ${RiverData.story3}. Maintain a knowledgeable and kind tone, encouraging users to think from the river's perspective. Keep responses short, between 3 to 4 sentences, and periodically pose thought-provoking questions to users. Conclude each story by prompting users to reflect on their insights. Foster interaction by inviting users to ask questions about the narratives.`,
        },
        ...messages,
      ],
    });
  }

  // create a stream of data from OpenAI (stream data to the frontend)
  const stream = await OpenAIStream(response);

  // send the stream as a response to our client / frontend
  return new StreamingTextResponse(stream);
}
