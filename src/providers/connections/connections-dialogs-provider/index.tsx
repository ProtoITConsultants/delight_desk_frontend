import { CONNECTION_MODAL_TYPE } from "@/modules/protected-routes/connections-page/utils/types";
import { createContext, useContext, useState } from "react";

interface CONNECTION_DIALOG_PROVIDER_TYPE {
  wooCommerceDialog: CONNECTION_MODAL_TYPE;
  setWooCommerceDialog: React.Dispatch<
    React.SetStateAction<CONNECTION_MODAL_TYPE>
  >;
  shipstationDialog: CONNECTION_MODAL_TYPE;
  setShipstationDialog: React.Dispatch<
    React.SetStateAction<CONNECTION_MODAL_TYPE>
  >;
}

// Create context with default value
const ConnectionsDialogsContext =
  createContext<CONNECTION_DIALOG_PROVIDER_TYPE>({
    wooCommerceDialog: { isModalOpen: false, type: "" },
    setWooCommerceDialog: () => null,
    shipstationDialog: { isModalOpen: false, type: "" },
    setShipstationDialog: () => null,
  });

// Hook for consuming the context
export const useConnectionsDialogs = () => {
  const context = useContext(ConnectionsDialogsContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

// Provider component
export const ConnectionsDialogsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // States
  const [wooCommerceDialog, setWooCommerceDialog] =
    useState<CONNECTION_MODAL_TYPE>({
      isModalOpen: false,
      type: "",
    });
  const [shipstationDialog, setShipstationDialog] =
    useState<CONNECTION_MODAL_TYPE>({
      isModalOpen: false,
      type: "",
    });

  const value = {
    wooCommerceDialog,
    setWooCommerceDialog,
    shipstationDialog,
    setShipstationDialog,
  };

  return (
    <ConnectionsDialogsContext.Provider value={value}>
      {children}
    </ConnectionsDialogsContext.Provider>
  );
};
