const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "046302c1927d500728cc5c01be3102c0637c364fb8ac0f527ab7ac10cbf29ec1c0a1c2ab50e3671dd62d933b0fcd063eac76e694545bcab935af21b3fd504b3188": 100,
  "04d35872fc6b798f753cc514c28ecbfca0bc40e9c1d1b53eec8fa4a48e544da47821f6ec1d5bf02316be60a0ce7631f4ddac0c93e43f8dd65b5d7d6003b1bbba64": 50,
  "042e6088bd3cbee3ae3308c85b74177103f6ac2113e7fa19bf28290d3f85e8426376258643f048579342504a0bcc0e4398f32648149e5a2f64488962a13a42854c": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
