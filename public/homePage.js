const logoutButton = new LogoutButton;
const ratesBoard = new RatesBoard;
const moneyManager = new MoneyManager;
const favoritesWidget = new FavoritesWidget;

let interval = setInterval(() => courseCurrency(), 60000);

logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response) {
        clearInterval(interval);
        location.reload();
      }
    });
};

ApiConnector.current((response) => {
  if (response.success) {
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

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(
        response.success,
        "Конвертация успешно завершена"
      );
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
}

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(
        response.success,
        "Перевод успешно выполнен"
      );
    } else {
      neyManager.setMessage(response.success, response.error);
    }
  });
}

function getMethods(response) {
  favoritesWidget.clearTable();
  favoritesWidget.fillTable(response.data);
  moneyManager.updateUsersList(response.data);
}

ApiConnector.getFavorites((response) => {
  if (response) {
    getMethods(response);
  }
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      getMethods(response);
      favoritesWidget.setMessage(response.success, 'Пользователь добавлен');
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
};

favoritesWidget.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, (response) => {
    if (response.success) {
      getMethods(response);
      favoritesWidget.setMessage(response.success, "Пользователь удален");
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
}