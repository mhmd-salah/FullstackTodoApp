import { motion } from "framer-motion";

export const BackgroundBeams = () => {
  return (
    <div className="relative h-full w-full">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Beam elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 blur-3xl" />
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-gradient-to-l from-pink-500 to-orange-500 opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-t from-green-500 to-yellow-500 opacity-20 blur-3xl" />
      </motion.div>
      {/* Content goes here */}
    </div>
  );
};
