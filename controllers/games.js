const sendAllGames = (req, res) => {
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(req.gamesArray))
};

const sendGameCreated = (req, res) => {
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(req.game))
};

const sendGameUpdated = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({message: 'Игра обновлена'}))
};

const sendGameDeleted = (req, res) => {
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(req.game))
};

const sendGameById = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.game));
  };

module.exports = {sendAllGames, sendGameCreated, sendGameUpdated, sendGameDeleted, sendGameById};