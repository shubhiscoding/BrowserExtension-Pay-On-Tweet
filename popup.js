const extractTweetId = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    const id = extractTweetId(currentTab.url);
    if (id === null || isNaN(id)) {
      console.log("Invalid tweet URL");
      return;
    }else if(currentTab.url.includes("https://x.com/")) {
      document.getElementById('tweetUrl').value = currentTab.url;
    }
  });
});

document.getElementById('applyTip').addEventListener('click', () => {
  let mainUrl  = document.getElementById('tweetUrl').value;
  const tipValue = document.getElementById('tipValue').value;
  const Consoleerror = document.getElementById('tabId');
  if(tipValue < 0.001){
    console.log("Invalid tip amount");
    Consoleerror.innerHTML = "tip amount must be greater than 0.001";
    return;
  }
    if (mainUrl) {
      const id = extractTweetId(mainUrl);
      if (id === null || isNaN(id)) {
        console.log("Invalid tweet URL");
        Consoleerror.innerHTML = "Invalid tweet URL";
        return;
      }
    }else{
      Consoleerror.innerHTML = "Please enter a tweet URL";
      return;
    }
    if (mainUrl.includes("https://x.com/")) {
      chrome.tabs.create({ url: `https://payontweets.vercel.app/?amount=${tipValue}/?url="${mainUrl}"`});
    }else {
      Consoleerror.innerHTML = "Invalid tweet URL";
      return;
    }
});