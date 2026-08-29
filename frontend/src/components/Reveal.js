import { motion, useReducedMotion } from "framer-motion";

const EASE=[0.16,1,0.3,1];

export const Reveal=({children,delay=0,y=40,className="",...rest})=>{
  const reduceMotion=useReducedMotion();
  return <motion.div
    className={className}
    initial={reduceMotion?false:{y,opacity:0}}
    whileInView={reduceMotion?undefined:{y:0,opacity:1}}
    viewport={{once:true,margin:"-80px"}}
    transition={reduceMotion?undefined:{duration:0.9,ease:EASE,delay}}
    {...rest}
  >{children}</motion.div>
};

export const MaskedLines=({lines,className="",delay=0})=>{
  const reduceMotion=useReducedMotion();
  return <span className={className}>{lines.map((line,i)=><span key={i} className="block overflow-hidden pb-[0.35em] -mb-[0.22em]"><motion.span className="block" initial={reduceMotion?false:{y:"110%"}} animate={reduceMotion?undefined:{y:"0%"}} transition={reduceMotion?undefined:{duration:1.05,ease:EASE,delay:delay+i*.12}}>{line}</motion.span></span>)}</span>
};

export const staggerContainer={hidden:{},show:{transition:{staggerChildren:.12}}};
export const staggerItem={hidden:{y:30,opacity:0},show:{y:0,opacity:1,transition:{duration:.8,ease:EASE}}};
