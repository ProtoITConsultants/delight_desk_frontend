"use client";
import React, { createContext, useContext, useState } from "react";
import { SIGNATURE_BUILDER_CONTEXT_TYPE } from "../../types/signature-builder-context";

const SignatureBuilderContext =
  createContext<SIGNATURE_BUILDER_CONTEXT_TYPE | null>(null);

export const SignatureBuilderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [signatureHtml, setSignatureHtml] = useState("");

  return (
    <SignatureBuilderContext.Provider
      value={{ signatureHtml, setSignatureHtml }}
    >
      {children}
    </SignatureBuilderContext.Provider>
  );
};

export const useSignatureBuilder = () => {
  const ctx = useContext(SignatureBuilderContext);
  if (!ctx)
    throw new Error(
      "useSignaturePreview must be used inside SignaturePreviewProvider"
    );
  return ctx;
};
