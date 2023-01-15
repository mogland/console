import { motion } from "framer-motion";

export const Loading: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <>
      {loading && (
        <motion.div
          className="loading-circle"
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
      )}
    </>
  );
};
