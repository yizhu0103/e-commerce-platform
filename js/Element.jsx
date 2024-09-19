
function Header() {
    return (
        <header id="topbar">

            <div class="logo"><a href="../index.html">
                <img src="../img/logo_transparent.png" alt="" />
            </a></div>
            <nav className="navigation">
                <ul className="menulist">
                    <li><a href="../index.html#new">最新</a></li>
                    <li><a href="./shoplist.html">商品</a></li>
                    <li><a href="./emulator.html">模擬器</a></li>
                    <li><a href="#">關於</a></li>
                </ul>
                <ul className="iconlist">
                    <li><a href="#"><img src="../img/index/search.svg" alt="" /></a></li>
                    <li><a href="./login.html"><img src="../img/index/member.svg" alt="" /></a></li>
                    <li><a href="./checkout.html"><img src="../img/index/bag.svg" alt="" /></a></li>

                </ul>
            </nav>
        </header>
    )
}



function Card(props) {
    // 資料解構:把物件或陣列內容提出來給指定變數(必須是被解構的來源是元件的屬性名稱)
    // console.log(props);
    const { title, img, alt, price, appraise, nature, className } = props;

    return (
        <li className={className}>
            <a className="cardProps" href="./shop.html">
                <img src={img} alt={alt} />
                <div className='titlebox'>
                    <h2>{title}</h2>
                    <h3>{nature}</h3>
                </div>
                <div className="price">
                    <h5>{appraise}</h5>
                    <h4>NT. {price}</h4>
                </div>
            </a>
        </li>
    );
}

function Options() {
    return <>
        <div className="choice">
            <h2>顏色</h2>
            <div className="chlist">
                <select name="other" title="顏色選項">
                    <option defaultValue="黑">黑</option>
                    <option defaultValue="白">白</option>
                    <option defaultValue="灰">灰</option>
                </select>
            </div>
        </div>
        <div className="choice">
            <h2>尺寸</h2>
            <div className="chlist">
                <select name="other" title="尺寸選項">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>
            </div>
        </div>
    </>
}





function Footer() {
    return (
        <footer>
            <small>Copyright &copy; 2024 Elegancia. 保留一切權利。本網頁為練習網頁無任何商業活動</small>
        </footer>)

}