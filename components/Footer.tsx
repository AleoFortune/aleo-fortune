"use client";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
};

const Footer = (props: Props) => {
  return <div className={cn(props.className)}>Footer</div>;
};

export default Footer;
