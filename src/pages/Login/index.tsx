import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import type { BasicPage } from "@type/basic";
import styles from "./index.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@utils/request";
import { app } from "@states/app";
import { setCookie } from "@utils/cookie";
import { jump } from "@utils/path";
import { useSeo } from "@hooks/useSeo";
import { toast } from "sonner";
import useSWR from "swr";
import { useSnapshot } from "valtio";

export const Login: BasicPage = () => {
  useSeo("登录");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const appSnapshot = useSnapshot(app);
  const { error } = useSWR("/user/master/info");
  if (error) {
    toast.error("无用户信息，请注册");
    navigate(jump("/register"));
  }
  useEffect(() => {
    if (appSnapshot.authenticated) {
      toast.success("已登录，正在前往仪表盘");
      navigate(jump("/dashboard"));
      return;
    }
    app.showSidebar = false;
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
          setCookie("token", res.token);
          toast.success("登录成功, 欢迎回来");
          app.authenticated = true;
          app.showSidebar = true;
          navigate(jump("/dashboard"));
          // window.location.reload();
        })
        .catch((res) => {
          toast.error(`登录失败 - ${res.data.message}`);
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
