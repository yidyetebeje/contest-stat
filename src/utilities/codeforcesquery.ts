import crypto from "crypto";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const apiKey = "44cfcb065b39a1d98756b6d4335dacfb1274be38";
export const secret = "0ce71e2af1be124c5f1c5d45a3ebef42dcc24a92";
export async function ContestVirtual(contestId: string) {
  const from = 1;
  const count = 300;
  const showUnofficial = true;
  const base_url = `https://codeforces.com/api/contest.standings?contestId=${contestId}&from=${from}&count=${count}&showUnofficial=${showUnofficial}`;
  const timestamp = Math.round(new Date().getTime() / 1000);
  const start = 123456;
  const apiSign = `${start}/contest.standings?apiKey=${apiKey}&contestId=${contestId}&count=${count}&from=${from}&showUnofficial=${showUnofficial}&time=${timestamp}#${secret}`;
  const apiSig = crypto.createHash("sha512").update(apiSign).digest("hex");
  const url = `${base_url}&apiKey=${apiKey}&time=${timestamp}&apiSig=${start}${apiSig}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });
  const data = await response.json();
  let virtualParticipant = data.result.rows.filter(
    (el) => el.party.participantType === "VIRTUAL",
  );
  let participantInfo = virtualParticipant.map((el: any) => {
    return {
      handle: el.party.members[0].handle.toLowerCase(),
      rank: el.rank,
      solvedInContest: el.points,
    };
  });

  let ghanastudent = participantInfo.filter((info) =>
    ghana.includes(info.handle),
  );
  let aastug4student = participantInfo.filter((info) =>
    aastug4.includes(info.handle),
  );

  let AAIT_G4student = participantInfo.filter((info) =>
    AAIT_G4.includes(info.handle),
  );
  let g5students = participantInfo.filter((info) =>
    G5education.includes(info.handle),
  );

  return {
    ghanastudent,
    aastug4student,
    AAIT_G4student,
    g5students,
  };
}
export async function Contest(contestId: string) {
  const from = 1;
  const count = 300;
  const showUnofficial = false;
  const base_url = `https://codeforces.com/api/contest.standings?contestId=${contestId}&from=${from}&count=${count}&showUnofficial=${showUnofficial}`;
  const timestamp = Math.round(new Date().getTime() / 1000);
  const start = 123456;
  const apiSign = `${start}/contest.standings?apiKey=${apiKey}&contestId=${contestId}&count=${count}&from=${from}&showUnofficial=${showUnofficial}&time=${timestamp}#${secret}`;
  const apiSig = crypto.createHash("sha512").update(apiSign).digest("hex");
  const url = `${base_url}&apiKey=${apiKey}&time=${timestamp}&apiSig=${start}${apiSig}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });
  const data = await response.json();
  let participantInfo = data.result.rows.map((el: any) => {
    return {
      handle: el.party.members[0].handle.toLowerCase(),
      rank: el.rank,
      solvedInContest: el.points,
    };
  });
  let virtualData = await ContestVirtual(contestId);
  let ghanastudent = participantInfo.filter((info) =>
    ghana.includes(info.handle),
  );
  let aastug4student = participantInfo.filter((info) =>
    aastug4.includes(info.handle),
  );

  let AAIT_G4student = participantInfo.filter((info) =>
    AAIT_G4.includes(info.handle),
  );
  let g5students = participantInfo.filter((info) =>
    G5education.includes(info.handle),
  );

  console.log(g5students);
  return {
    averageSolved: {
      g5students: averageSolved(g5students.concat(virtualData.g5students)),
      ghanastudent: averageSolved(
        ghanastudent.concat(virtualData.ghanastudent),
      ),
      AAIT_G4student: averageSolved(
        AAIT_G4student.concat(virtualData.AAIT_G4student),
      ),
      aastug4student: averageSolved(
        aastug4student.concat(virtualData.aastug4student),
      ),
    },
    noSubmission: {
      g5students: noSubmission(
        g5students.concat(virtualData.g5students),
        G5education,
      ),
      ghanastudent: noSubmission(
        ghanastudent.concat(virtualData.ghanastudent),
        ghana,
      ),
      AAIT_G4student: noSubmission(
        AAIT_G4student.concat(virtualData.AAIT_G4student),
        AAIT_G4,
      ),
      aastug4student: noSubmission(
        aastug4student.concat(virtualData.aastug4student),
        aastug4,
      ),
    },
    virtual: {
      ...virtualData,
    },
    ghanastudent,
    aastug4student,
    AAIT_G4student,
    g5students,
  };
}
function averageSolved(arr) {
  let ans = 0;
  arr.forEach((el) => {
    ans += el.solvedInContest;
  });
  ans = arr.length == 0 ? 0 : ans / arr.length;
  return ans.toFixed(2);
}
function noSubmission(contest, main) {
  let filtered = main.filter((el) => {
    for (let i = 0; i < contest.length; i++) {
      if (contest[i].handle == el) return false;
    }
    return true;
  });
  return filtered;
}

export const ghana = [
  "johnteyedoku",
  "adams7018",
  "georgeey123",
  "nathan89",
  "aratkilo",
  "kassim_0101",
  "EricaAnnor",
  "Spongebobx",
  "um_farouk",
  "evansachie01",
  "akua.nkrumah7",
  "serkhani",
  "KudusBannah",
  "FelixNotter",
  "MIYAKA_CMR",
  "Raph77",
  "mikkay",
  "tariqnassiru",
  "FARAD56",
  "ephraimmensah99",
  "Eben_Success",
  "Haqq",
].map((el) => el.toLowerCase());
export const aastug4 = [
  "yonibabi",
  "ablakew7ab",
  "BisRy",
  "okitta_ongaye",
  "milkaai",
  "natiyeshi",
  "kemalsiraj24",
  "Eshetu_girma",
  "abelabebe313",
  "naoltamrat36",
  "fuadMiftah",
  "doiamd",
  "haymanotdemis",
  "a_bigi",
  "xbebe346",
  "mihret_ag",
  "jossy_",
  "Nahom4258",
  "aymeneliyas",
  "anekahiwot",
  "aser_hailu",
  "aklileseyoum",
  "yordi1",
  "Betiiy_haile",
  "CallmeVick",
  "Code-13",
  "yabsera-haile",
  "samuel45",
  "Abuye",
  "gemechis",
  "keba",
].map((el) => el.toLowerCase());

const AAIT_G4 = [
  "melody",
  "Brook_W83",
  "bereketdemissie4382",
  "hordofahaile7",
  "zjagema",
  "Dawit-Melka",
  "aenonsolomon0",
  "SarahAbera",
  "Ketemagirma",
  "Abenina14",
  "debi_b",
  "Mikiyas21",
  "Breaker16",
  "Son-OfAnton",
  "zelalem",
  "poison_11",
  "mengesha",
  "fikremariamfikadud54",
  "reevo12",
  "josh_1_jt_",
  "Anteneh",
  "dawit_01",
  "Blackbeatle",
  "fenetshewarega",
  "cyber-01",
  "Mihretab_Nigussie",
].map((el) => el.toLowerCase());
export const G5education = [
  "abelbmg1",
  "abelazereabruk1",
  "amanueltsehay11",
  "amhamersh",
  "shuaib987",
  "bezawitassaye",
  "Dagmawi",
  "Haileamlak",
  "OumJa",
  "4ureyes",
  "kal_7",
  "kidusshun",
  "lemidinq",
  "melat_wolde",
  "melki",
  "Kintsugi",
  "naola",
  "Natinael",
  "sabona",
  "Silvanus",
  "Surraa",
  "TigistZelalem",
  "Tinsae_T",
  "YohannesA",
  "yohannesmengistie634",
  "yonatann",
  "simond",
  "abinet",
  "sophinaz",
  "Gadisa_16",
  "AregawiF",
  "beleir101",
  "Bisrat_A",
  "ebaadisu2",
  "emexnord",
  "Ephrem_shimels",
  "etsubeta",
  "fanual03",
  "FedasaBote",
  "fedhasa7",
  "hailemariamkefale19",
  "Mercury1565",
  "Hope_al",
  "luhygenet",
  "RealFAMILY",
  "Mesay",
  "mx1.mr41",
  "XRASH01",
  "rabumili",
  "misami",
  "sifanfita",
  "Teim",
  "usmael",
  "eshetieyabibal",
  "yohannes2221",
  "johna21",
  "natinael.96",
  "ErmiCodeforce",
  "dawit_ab",
  "nardicha",
  "nati.b22",
  "abzaeko",
  "etlak",
  "abe16s",
  "anatoli.derese",
  "TrashPitch",
  "bisrat",
  "dagu",
  "dododoyo",
  "eyobderese123",
  "eyuab",
  "oceanF",
  "Fuad_mh",
  "gado16",
  "habib.gemmech",
  "immrmo",
  "kidusm3l",
  "leykunbi12",
  "metilamessa",
  "michaelshimeles099",
  "mulugeta-89",
  "mulukenHailu",
  "Nazil_G",
  "evolve_",
  "SamrawitDawit",
  "Yani22",
  "Yigerem",
  "jonathanasfaw",
  "Yordi-SE",
  "yordanos_mela",
  "yayne30",
  "Bemnet16",
  "nuredinbederu10k",
  "just_yehone_sew",
  "aha-du",
  "beka-birhanu",
  "bereket_asnake",
  "betel",
  "DagimFikru",
  "todo_aoi_27",
  "Eyyonas",
  "Emran_Emran",
  "Enyew_Anberbir",
  "Walker01",
  "Etsubie",
  "tien_joel",
  "Fraol27",
  "Hana-Guta",
  "Herica",
  "khalid11abdu",
  "melakeytb",
  "Mick_8p",
  "Alctrazz",
  "ZRobert",
  "sfst",
  "umerabdu",
  "Jabez",
  "yoniti",
  "zemenumekiria",
  "m_power",
  "timid_",
  "habtse21",
  "abdulkerim.seid",
  "maajid",
  "a_be",
  "Bigu_g",
  "bekia",
  "Mclovin2",
  "DagmDageron",
  "danielababu",
  "dinaamare1",
  "injeolmi10",
  "enkutatash",
  "eulmelk",
  "hewanalemayehu2815",
  "Kibr",
  "MTA9402",
  "mahisami",
  "MediUnique",
  "Msol",
  "Michealzeleke",
  "miheret",
  "moIsh3884",
  "nathy94",
  "rebuma",
  "Redietamare04",
  "samuels5",
  "teklumo",
  "blogrammer",
  "Ola-je",
  "Eyobtesfaye",
  "keneanbirubalcha",
  "abenezer_m54",
  "abeni505",
  "Habeshaethiopia",
  "amanuelmandefrow",
  "aye_tar",
  "ETdan",
  "fast88",
  "Ermi_007",
  "Jermi",
  "bz_ey",
  "haweten",
  "Ikru",
  "Libe12",
  "mahicodes",
  "mer_on",
  "Mihretthe",
  "nahiyo86",
  "natigold",
  "nebil_alghazi",
  "Samrawit",
  "Sefu-k",
  "simret",
  "Solome",
  "star5",
  "yordi_l",
  "natnael_necho",
  "BezawitTezera",
  "matijosh",
  "Mistire37",
  "Switch247",
  "FunkyLlama",
  "aduna_kebeda",
  "Afomia",
  "hararsa",
  "Wapanda",
  "dipherent_1",
  "DannyMek",
  "estifo",
  "eyobmamo",
  "eyuted",
  "Easter_G",
  "phebes",
  "hawi-ab",
  "Hiwot_21",
  "makda_yoseph",
  "melke_mk",
  "Yumi_meron",
  "mihretd",
  "TNAHOM",
  "naodmulu",
  "natnaelmeseret5",
  "Lone_Wolf17",
  "olanakelbesa",
  "Tarikua",
  "YetiA",
  "Kalkidan_Amare",
  "Betselot_T",
  "bitbyte01",
  "Abdi0_917",
  "Alien11d",
  "abel.wendmu",
  "Abeselom12",
  "biniyamnegasa",
  "bura_t1",
  "chalaolani",
  "chera_mihiretu",
  "dagota",
  "Dave_get",
  "Duressa2022",
  "ephyg",
  "joshx01",
  "poricf",
  "fasil_fs",
  "Firaol_Bulo",
  "Hmz10",
  "hundera",
  "kalebwondimu33",
  "Kalki75",
  "kidy",
  "kiyakebe",
  "Mohaali482",
  "mucrazy",
  "nafnati",
  "naolkasinet",
  "Nasiha",
  "UT-Infinity",
  "samuel_18hirut",
  "Sami_g95",
  "free_thinkers",
  "wondm",
  "yeneinehseiba",
  "Yohannes_welel",
  "Sanoy-si",
  "nahomderese",
  "SariAmin",
  "kika1s1",
  "abdesu04",
  "Nebati",
  "eyobtariku48",
  "kumatelila26",
  "ngu_d",
  "Asche",
  "asegidadane27",
].map((el) => el.toLowerCase());
