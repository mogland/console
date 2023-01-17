import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import type { BasicPage } from "@type/basic";
import styles from "./index.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@utils/request";
import { Twindow } from "@components/universal/Twindow";
import { app } from "@states/app";
import { setCookie } from "@utils/cookie";

export const Login: BasicPage = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  app.showSidebar = false;

  useEffect(() => {
    apiClient("/user/master/info").catch(() => {
      navigate("/register");
    })
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = formRef.current;
    if (form) {
      const username = (form.elements.namedItem("username") as RadioNodeList)!
        .value;
      const password = (form.elements.namedItem("password") as RadioNodeList)!
        .value;
      apiClient("/user/login", {
        method: "POST",
        body: {
          username,
          password,
        },
      })
        .then((res) => {
          setCookie("token", res.token)
          Twindow({
            title: `欢迎回来 - ${res.nickname}`,
            text: ``,
            allowClose: true,
            image: res.avatar,
          });
          app.authenticated = true;
          navigate("/dashboard");
          window.location.reload();
        })
        .catch((res) => {
          Twindow({
            title: `登录失败 - ${res.data.message}`,
            text: `请检查提交信息是否正确`,
            allowClose: true,
          });
        });
    }
    setLoading(false);
  }

  return (
    <>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.title)}> 登录 </div>
        <div>
          <form
            ref={formRef}
            autoComplete="off"
            className={clsx(styles.form)}
            onSubmit={handleSubmit}
          >
            <input
              className={styles["form-input"]}
              type="text"
              name="username"
              placeholder="用户名"
              autoFocus
            />
            <input
              className={styles["form-input"]}
              type="password"
              name="password"
              placeholder="密码"
            />
            <button className={clsx(styles["form-button"])} type="submit">
              <span className={clsx(loading && styles["form-loading"])}>
                登录
              </span>

              <motion.span
                className={clsx(
                  loading && styles["form-loading-circle"],
                  styles["form-circle"]
                )}
                animate={{
                  rotate: [0, 720],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
                style={{
                  borderRadius: "100%",
                }}
              />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
