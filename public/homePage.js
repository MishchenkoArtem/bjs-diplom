const logoutButton = new LogoutButton;
const ratesBoard = new RatesBoard;
const moneyManager = new MoneyManager;

logoutButton.action = () => {
  ApiConnector.logout((element) => {
    if (element) {
      return location.reload();
      }
    });
};

ApiConnector.current((response) => {
  if (response) {
    ProfileWidget.showProfile(response.data);
  }
});

function courseCurrency() {
  ApiConnector.getStocks((response) => {
    if (response) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

courseCurrency();
setInterval(() => courseCurrency(), 60000);

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Баланс пополнен");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
}