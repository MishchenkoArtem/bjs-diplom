const logoutButton = new LogoutButton;

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

const ratesBoard = new RatesBoard;

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

const moneyManager = new MoneyManager;

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