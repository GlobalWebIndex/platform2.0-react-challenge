import { createContext } from "react";

import { contextInitState } from "../constants/context";
import { Context } from "../types/types";

export const CatContext = createContext<Context>(contextInitState);
