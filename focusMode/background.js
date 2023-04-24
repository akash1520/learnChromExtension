// chrome.runtime.onInstalled.addListener(() => {
//     chrome.action.setBadgeText({
//         text: "OFF",
//     });
// });

// bd=chrome.dom.getElementsByTagName("body")[0]



chrome.action.onClicked.addListener(async (tab) => {

  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  var siteArray = [
    ["https://nextjs.org/learn","focus-nextlearn.css"],
    ["https://developer.chrome.com/docs/webstore", "focus-mode.css"],
    ["https://developer.chrome.com/docs/extensions", "focus-mode.css"],
    [
      "https://twitter.com", "focus-twitter.css"
    ]]
  // console.log(tab.url)
  var cssFile = "";
  for (let i = 0; i < siteArray.length; i++) {
    let url = siteArray[i][0]
    let val = siteArray[i][1]
    console.log(tab.url.startsWith(url));
    if(tab.url.startsWith(url)){
      cssFile=val;
      break;
    }
  }


  // console.log(cssFile);

  if (nextState === "ON") {
    // bd.style.backgroundColor="black";
    // Insert the CSS file when the user turns the extension on

    await chrome.scripting.insertCSS({
      files: [cssFile],
      target: { tabId: tab.id },
    });

  } else if (nextState === "OFF") {
    // Remove the CSS file when the user turns the extension off
    await chrome.scripting.removeCSS({
      files: [cssFile],
      target: { tabId: tab.id },
    });
  }
})
