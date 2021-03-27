import Head from "next/head";
import createRef, { useRef, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  const displayImgStyle = {
    display: loaded ? undefined : "none",
  };

  const loadImage = () => {
    console.log("loaded");
    setLoaded(true);
  };

  async function submitForm() {
    const formData = new FormData();

    if (uploadFile) {
      formData.append("profilePicture", uploadFile);
    }
    const res = await fetch("/api/upload", {
      method: "PATCH",
      body: formData,
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {/* <img src={Spinner} style={loadingImgStyle} alt={"Loading"} /> */}
          <img
            src={uploadFile ? URL.createObjectURL(uploadFile) : null}
            alt={uploadFile ? uploadFile.name : null}
            width="100%"
            height="100%"
            style={displayImgStyle}
            onLoad={loadImage}
          />
        </div>
        <div>
          <form>
            <input
              type="file"
              name="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setUploadFile(e.target.files[0])}
            />
            <input type="button" value="upload" onClick={submitForm} />
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
