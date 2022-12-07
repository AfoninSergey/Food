const postData = async (url, formData) => {
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: formData,
  });

  return await req.json();
};

const getMenuCards = async (url) => {
  const req = await fetch(url);
  if (!req.ok) {
    throw new Error(`Ошебка! Путь ${url} не фетчится! Статус ${req.status}`);
  }

  return req.json();
};

export {postData, getMenuCards};