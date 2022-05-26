const puppeteer = require("puppeteer");

//Ler a Pagina
async function start() {
  async function loadMore(page, selector) {
    const moreButton = await page.$(selector);
    if (moreButton) {
      console.log("clicked");
      await moreButton.click();
      await page.waitFor(selector, { timeout: 3000 }).catch(() => {
        console.log("timeout");
      });
      await loadMore(page, selector);
    }
  }

  //Pegar os Comentarios / Arrobas
  async function getComments(page, selector) {
    const comments = await page.$$eval(selector, (links) =>
      links.map((link) => link.innerText)
    );
    return comments;
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.goto("https://www.instagram.com/p/CatM_4EqNb_/");

  await loadMore(page, ".QBdPU");
  const arrobas = await getComments(page, ".Mr508 span a");
  const counted = count(arrobas);
  const sorted = sort(counted);
  sorted.forEach((arroba) => {
    console.log(arroba);
  });
  console.log(comments);

  await browser.close();
}
//Fake

const fakeArrobas = [
  "@shoptimaooficial",
  "@shoptimaooficial",
  "@biaolimpia",
  "@mercadodabolaoficiall",
  "@mercadodabolaoficiall",
  "@lumapnt",
  "@_clarissacarvalho",
  "@eaecaio._",
  "@eaecaio._",
  "@raquel.nogueiira",
  "@rocha_1933",
  "@rocha_1933",
  "@colecaodocorinthians",
  "@colecaodocorinthians",
  "@matheusramalho0",
  "@marinainserraadotedog",
  "@jesusjjuan",
  "@fernandacarvalho351421",
  "@mila_figuee",
  "@raffassx",
  "@_sntts_izaquiel.157",
  "@brenno_walbert_11",
];

// Contar arrobas repetidas

function count(arrobas) {
  const count = {};
  arrobas.forEach((arroba) => {
    count[arroba] = (count[arroba] || 0) + 1;
  });
  return count;
}

//console.log(count(fakeArrobas));
//Ordenar
function sort(counted) {
  const entries = [];

  for (prop in counted) {
    entries.push([prop, counted[prop]]);
  }

  const sorted = entries.sort((a, b) => {
    return b[1] - a[1];
  });
  return sorted;
}

start();
