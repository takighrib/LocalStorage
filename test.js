function setWithExpiry(key, value, time) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + time * 1000, 
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  
  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
  
  setWithExpiry("key1", "value", 1000);
  
  const valueWithinExpiry = getWithExpiry("key1");
  console.log(valueWithinExpiry); 
  
  setTimeout(() => {
    const valueAfterExpiry = getWithExpiry("key1");
    console.log(valueAfterExpiry); 
  }, 1001000); 
  