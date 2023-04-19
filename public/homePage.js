const logoutButton = new LogoutButton;
const ratesBoard = new RatesBoard;
const moneyManager = new MoneyManager;
const favoritesWidget = new FavoritesWidget;

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

ApiConnector.getFavorites((response) => {
  if (response) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, 'Пользователь добавлен');
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
};

favoritesWidget.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, "Пользователь удален");
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
}