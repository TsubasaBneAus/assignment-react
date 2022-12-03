import "../stylesheets/Footer.css";

const Footer = () => {
    const Image_URL = "https://unsplash.com/photos/orQBzc7Dl3U";
    return (
        <div className="Footer">
            <p className="FooterMessage">
                Developer: Tsubasa Endo (n10724681). The image above is cited from <i>Mount Fuji</i> by Tomáš Malík, 2019, Unsplash. (
            </p>
            <a className="Image_URL" href={Image_URL} target="_blank">Link</a>
            <p className="FooterMessage">)</p>
        </div>
    );
};

export default Footer;