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

function setNavigationBarWhite() {
  my.setNavigationBar({
    title: 'Flight White',
    backgroundColor: '#FFFFFF',
    success() { 
    },
    fail() {
      my.alert({
        content: 'Failed to set Navbar',
      });
    },
  });
}

function setNavigationBarBlue() {
  my.setNavigationBar({
    title: 'Flight Blue',
    backgroundColor: '#1C85C7',
    success() { 
    },
    fail() {
      my.alert({
        content: 'Failed to set Navbar',
      });
    },
  });
}

function authCheckWithScope(scopes=[]) {
  my.getAuthCode({
    scopes,
    success: (res) => {
      my.alert({
        content: JSON.stringify(res),
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

function authCheck() {
  const scopes = ['MINI_PROGRAM','CASHIER','PUBLIC_ID']
  authCheckWithScope(scopes)
}

function authCheckScopeUser() {
  const scopes = ['auth_user']
  authCheckWithScope(scopes)
}

function authCheckScopeBase() {
  const scopes = ['auth_base']
  authCheckWithScope(scopes)
}

function msgToParent() {
  const objMsg = {isBookingSuccess: false, amount: 5000, title: "Flight"}
  window.parent.postMessage(objMsg, "*")
}

function authLocalStorageTest() {
  const storageKey = "H5MINIAPP_TOKEN"

  const update = () => {
    const strValue = prompt("Set auth value", "111111a")
    const val = JSON.stringify({auth: strValue, isExpired: false})
    localStorage.setItem(storageKey, val)
    alert("value set: " + val)
  }

  const get = () => {
    try {
      const getVal = localStorage.getItem(storageKey) || "{}"
      const parsedVal = JSON.parse(getVal)
      const formatVal = Object.entries(parsedVal).map(item => `${item[0]}= ${item[1]}`).join(", ")
      alert(formatVal)
    } catch (e) {
      console.error(e)
      alert("Failed to get item")
    }
  }

  return {
    update, 
    get
  }
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
    ['NavbarWhiteBtn', setNavigationBarWhite],
    ['NavbarBlueBtn', setNavigationBarBlue],
    ['AuthBtnScopeUser', authCheckScopeUser],
    ['AuthBtnScopeBase', authCheckScopeBase],
    ['PayBtn', tradePay]
  ]

  listenerList.forEach(el => {
    const tempVar = document.getElementById(el[0])
    tempVar.addEventListener('click', el[1])
  });
})();