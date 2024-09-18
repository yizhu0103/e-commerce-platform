
function Header() {
    return (
        <header id="topbar">

            <div className="logo"><a href="../index.html"><h1>Elegancia</h1></a></div>
            <nav className="navigation">
                <ul className="menulist">
                    <li><a href="../index.html#new">最新</a></li>
                    <li><a href="./shoplist.html">分類</a></li>
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
    const { title, img, alt, price, appraise, nature , className } = props;

    return (
        <a className={`cardProps ${className}`}  href="./shop.html">
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
    );
}


function Footer(){
    return(
    <footer>
                        <div class="footerlogo">
                            <div class="logo">121312</div>
                            <small>13212313131</small>
                        </div>

                        <div class="footerlist">

                            <ul>
                                <li><a href="./shoplist.html">最新</a></li>
                                <li><a href="./shoplist.html">分類</a></li>
                                <li><a href="./emulator.html">模擬器</a></li>
                                <li><a href="#">關於</a></li>
                            </ul>

                        </div>
                    </footer>)

}