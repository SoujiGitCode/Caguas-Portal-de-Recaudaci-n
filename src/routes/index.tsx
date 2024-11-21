import { Route, Routes } from "react-router-dom";
import { Home, Landing, Login, Register, Profile, Fast, CreatePatent, Querella } from "@/views";
import { UnauthorizedLayout, AuthorizedLayout } from "@/layout";
import { PATH } from "./constants";
import useAuthStore from "@/hooks/useAuthStore";
import Error404 from "@/views/Error404";
import Error500 from "@/views/Error500";
import Recovery from "@/views/Recovery";
import RecoveryToken from "@/views/RecoveryToken";
import TermsandConditionsLayout from "@/layout/TermsAndConditionsLayout";
import TermsandConditions from "@/views/TermsAndConditions";

const Root = () => {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  return (
    <Routes>
      {/* Rutas accesibles para todos */}
      <Route path={PATH.ROOT} element={<UnauthorizedLayout />}>
        <Route path={PATH.ROOT} element={<Landing />} />
        <Route path={PATH.REGISTER} index element={<Register />} />
        <Route path={PATH.LOGIN} index element={<Login />} />
      </Route>

      {/* <Route path={PATH.ROOT} element={<TermsandConditionsLayout />}>
        <Route path={PATH.TERMS_AND_CONDITIONS} element={<TermsandConditions />} />
      </Route> */}


      {/* Rutas solo para usuarios no autorizados */}
      {!isAuthenticated && (
        <>
          <Route path={PATH.LOGIN} element={<UnauthorizedLayout />}>
            {/* <Route index element={<Login />} /> */}
          </Route>


          <Route path={PATH.RECOVERY} element={<UnauthorizedLayout />}>
            <Route index element={<Recovery />} />
          </Route>

          <Route path={PATH.RECOVERY_TOKEN} element={<UnauthorizedLayout />}>
            <Route index element={<RecoveryToken />} />
          </Route>
        </>
      )}

      {/* Rutas solo para usuarios autorizados */}
      {isAuthenticated && (
        <>
          <Route path={PATH.DASHBOARD} element={<AuthorizedLayout />}>
            <Route index element={<Home />} />
            {/* <Route index element={<Querella />} /> */}
          </Route>

          <Route path={PATH.PROFILE} element={<AuthorizedLayout />}>
            <Route index element={<Profile />} />
          </Route>

          <Route path={PATH.FAST} element={<AuthorizedLayout />}>
            <Route index element={<Fast />} />
          </Route>

          <Route path={PATH.PATENT} element={<AuthorizedLayout />}>
            <Route index element={<CreatePatent />} />
          </Route>

          <Route path={PATH.RECOVERY} element={<UnauthorizedLayout />}>
            <Route index element={<Recovery />} />
          </Route>

          <Route path={PATH.RECOVERY_TOKEN} element={<UnauthorizedLayout />}>
            <Route index element={<RecoveryToken />} />
          </Route>
        </>
      )
      }

      {/* Rutas para errores o no encontradas */}
      <Route path={PATH.NOT_FOUND} element={<Error404 />} />
      <Route path="*" element={<Error500 />} />
    </Routes >
  );
};

export default Root;
