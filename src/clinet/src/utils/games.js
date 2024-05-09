import config from "../config";

export const save_game = (gameid, score) => {
  fetch(
    `${config.baseurl}/benchmarks/save`,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        id: gameid,
        score: score
      })
    }
  )
}
