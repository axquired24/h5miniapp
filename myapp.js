function alertCheck() {
  my.alert({
    title: 'Test Alert!!',
    content: window.navigator.userAgent,
    buttonText: 'Alert Button',
    success: function (res) {
      my.alert({
        content: 'success!' + JSON.stringify(res),
      });
    },
    fail: function () {
      my.alert({
        content: 'fail!',
      });
    },
    complete: function () {
      my.alert({
        content: 'complete!',
      });
    },
  });
}

function authCheck() {
  my.getAuthCode({
    scopes: ['MINI_PROGRAM','CASHIER','PUBLIC_ID'],
    success: (res) => {
      my.alert({
        content: res.authCode,
      });
    },
    fail: (res) => {
        my.alert({
          content: "Failed to run my.getAuthCode, " + JSON.stringify(res),
        });
        console.log(res.authErrorScopes)
    },
  });
}

function tradePay() {
  my.tradePay({
    tradeNO: '201711152100110410533667792', // get the tradeNo from the server first
    success: (res) => {
      my.alert({
        content: JSON.stringify(res),
      });
    },
    fail: (res) => {
      my.alert({
        content: JSON.stringify(res),
      });
    }
  });
}

(function() {
  const listenerList = [
    ['AlertBtn', alertCheck],
    ['AuthBtn', authCheck],
    ['PayBtn', tradePay]
  ]

  listenerList.forEach(el => {
    const tempVar = document.getElementById(el[0])
    tempVar.addEventListener('click', el[1])
  });
})();