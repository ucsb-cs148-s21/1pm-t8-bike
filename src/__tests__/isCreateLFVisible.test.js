import LostandFound from "../pages/LostandFound";
import { render } from '@testing-library/react'
//import {spyOn} from 'jest';

describe('LostandFound', () => {
    describe('when user is not logged in', () => {
      it ('user should not see the create post button', () => {
        
        //const user = jest.fn(()=>true); //always return true
        const { getByTestId } = render(
          <LostandFound />
        );

        // check if the button is present,
        // if present, test success
        // if not, test fail

        //console.log(getByText("createPost"));
        expect(getByTestId("createPost")).toBeDisabled;
      });
    });
  });

  describe('LostandFound', () => {
    describe('when user is logged in', () => {
      it ('user should see the create post button', () => {
        
        const testUser = {
          ID: 123,
          fullName: "bob",
          givenName: "bobert",
          familyName: "dylan",
          imageUrl: "profile.getImageUrl()",
          email: "bobert@yahoo.com",
          signOut: "authInstance.signOut",
        };     

        const getUserMock = jest.fn();
        getUserMock.mockReturnValue(testUser);
        //const user = jest.fn(()=>true); //always return true
        const { getByTestId } = render(
          <LostandFound getUser={getUserMock}/>
        );   
        
        // check if the button is present,
        // if present, test success
        // if not, test fail

        //console.log(getByText("createPost"));
        expect(getByTestId("createPost")).not.toBeDisabled;
      });
    });
  });

  // test("should render Activity link", () => {
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <NavBar />
  //     </BrowserRouter>
  //   );
  //   const activityLink = getByText(/Activity/);
  //   expect(activityLink).toBeInTheDocument();
  // });
