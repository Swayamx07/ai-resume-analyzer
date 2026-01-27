function Layout({ children }) {
    return (
        <div style={styles.wrapper}>
            <div style={styles.nav}>AI Resume Analyzer</div>
            <div style={styles.content}>{children}</div>
        </div>
    );
}

const styles = {
    wrapper: {
        background: "#f5f7fb",
        minHeight: "100vh",
    },
    nav: {
        background: "#0f172a",
        color: "white",
        padding: "15px 30px",
        fontSize: "18px",
        fontWeight: "bold",
    },
    content: {
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
    },
};

export default Layout;
