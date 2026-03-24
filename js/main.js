// 模拟商品数据
const PRODUCTS = [
  {id: 1, name: "手机", price: 1999, desc: "高性能智能手机"},
  {id: 2, name: "耳机", price: 399, desc: "降噪蓝牙耳机"},
  {id: 3, name: "笔记本电脑", price: 4999, desc: "轻薄便携本"},
];

// 商品页展示所有商品
function renderProductList() {
  const listDiv = document.getElementById('product-list');
  if (!listDiv) return;
  listDiv.innerHTML = '';
  PRODUCTS.forEach(prod => {
    let node = document.createElement('div');
    node.className = "product-item";
    node.innerHTML = `
      <b>${prod.name}</b> - ￥${prod.price}<br>
      <span>${prod.desc}</span><br>
      <a href="product_detail.html?id=${prod.id}">查看详情</a>
      <button onclick="addToCart(${prod.id})">加入购物车</button>
    `;
    listDiv.appendChild(node);
  });
}

// 详情页展示单个商品
function renderProductDetail() {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id')) || 1;
  const prod = PRODUCTS.find(p => p.id === id);
  if (!prod) return;
  document.getElementById('pname').innerText = prod.name;
  document.getElementById('pprice').innerText = prod.price;
  document.getElementById('pdesc').innerText = prod.desc;
  document.getElementById('addCartBtn').onclick = () => addToCart(prod.id);
}

// 加入购物车
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find(c => c.id === id);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({id, qty: 1});
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('商品已加入购物车！');
}

// 购物车渲染
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const div = document.getElementById('cart-list');
  div.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const prod = PRODUCTS.find(p => p.id === item.id);
    if (!prod) return;
    let lineTotal = prod.price * item.qty;
    total += lineTotal;
    let node = document.createElement('div');
    node.className = "cart-item";
    node.innerHTML = `
      <strong>${prod.name}</strong> - ￥${prod.price} x ${item.qty} = ￥${lineTotal}
      <button onclick="removeFromCart(${prod.id})">移除</button>
    `;
    div.appendChild(node);
  });
  div.innerHTML += `<br><b>总价：￥${total}</b>`;
}

// 购物车删除
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// 下单页渲染
function renderOrder() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length === 0) {
    document.getElementById('order-content').innerHTML = "您的购物车为空。";
    return;
  }
  document.getElementById('order-content').innerHTML = `
    <button onclick="submitOrder()">提交订单</button>
  `;
}

// 下单
function submitOrder() {
  localStorage.removeItem('cart');
  document.getElementById('order-content').innerHTML = "订单提交成功！";
}

// 登录功能
function doLogin() {
  let user = document.getElementById('username').value.trim();
  let pwd = document.getElementById('password').value;
  if (user && pwd) {
    localStorage.setItem('user', user);
    alert('登录成功！');
    location.href = 'profile.html';
  } else {
    alert('用户名和密码不可为空！');
  }
}

// 个人中心
function renderProfile() {
  const user = localStorage.getItem('user');
  document.getElementById('uname').innerText = user || '未登录';
}