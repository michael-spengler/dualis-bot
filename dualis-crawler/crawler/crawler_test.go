package crawler

import (
	"io/ioutil"
	"net/http"
	"net/http/cookiejar"
	"net/http/httptest"
	"path/filepath"
	"reflect"
	"testing"
)

const (
	cnscValue = "F109567718B025DDCC0DB7084747AA2A"
)

func setupDualisMock() *httptest.Server {
	return httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.RequestURI {
		case "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=EXTERNALPAGES&ARGUMENTS=-N000000000000001,-N000324,-Awelcome":
			response, err := ioutil.ReadFile(filepath.Join("mockResponses", "WelcomePage.txt"))
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			w.Write(response)

		case "/scripts/mgrqispi.dll":
			w.Header().Add("Refresh", "0; URL=/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=STARTPAGE_DISPATCH&ARGUMENTS=-N680371142374020,-N000019,-N000000000000000")
			w.Header().Add("Set-Cookie", "cnsc ="+cnscValue+"; HttpOnly; secure")
			w.Write([]byte(""))

		case "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=STARTPAGE_DISPATCH&ARGUMENTS=-N680371142374020,-N000019,-N000000000000000":
			response, err := ioutil.ReadFile(filepath.Join("mockResponses", "RefreshPage.txt"))
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			w.Write(response)

		case "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=MLSSTART&ARGUMENTS=-N976165151668439,-N000019,":
			response, err := ioutil.ReadFile(filepath.Join("mockResponses", "StartPage.txt"))
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			w.Write(response)
		case "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=-N168866418179351,-N000307,":
			response, err := ioutil.ReadFile(filepath.Join("mockResponses", "GradePage.txt"))
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			w.Write(response)
		case "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=-N168866418179351,-N000307,-N000000015068000":
			response, err := ioutil.ReadFile(filepath.Join("mockResponses", "WiSe_20_21_DetailPage.txt"))
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			w.Write(response)

		case "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=RESULTDETAILS&ARGUMENTS=-N999133700060641,-N000307,-N376835200608230":
			response, err := ioutil.ReadFile(filepath.Join("mockResponses", "Detail_Page_BWL.txt"))
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			w.Write(response)
			/*
				case "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=RESULTDETAILS&ARGUMENTS=-N999133700060641,-N000307,-N376835220681812":
					response, err := ioutil.ReadFile(filepath.Join("mockResponses", "Detail_Page_Mathe.txt"))
					if err != nil {
						w.WriteHeader(http.StatusInternalServerError)
						return
					}
					w.Write(response)
			*/

		default:
			w.WriteHeader(http.StatusBadRequest)
			return

		}

	}))
}

func TestGetLoginData(t *testing.T) {
	dualisMockURL := setupDualisMock().URL
	jar, _ := cookiejar.New(nil)

	app := App{
		Client:  &http.Client{Jar: jar},
		BaseURL: dualisMockURL,
	}
	loginData, err := app.getLoginData("dummy", "dummy")
	if err != nil {
		t.Fatal(err)
	}
	expected := LoginInput{
		Appname:   "CampusNet",
		Prgname:   "LOGINCHECK",
		Arguments: "clino,usrname,pass,menuno,menu_type,browser,platform",
		Clino:     "000000000000001",
		Menuno:    "000324",
		Menu_type: "classic",
		Usrname:   "dummy",
		Pass:      "dummy",
		Browser:   "",
		Plattform: "",
	}
	if !reflect.DeepEqual(loginData, expected) {
		t.Fatal("loginDatas are not deeqEqual. expected: ", expected, "actual: ", loginData)
	}
}

func TestPerformLoginAndGetRefreshURL(t *testing.T) {
	dualisMockURL := setupDualisMock().URL
	jar, _ := cookiejar.New(nil)

	app := App{
		Client:  &http.Client{Jar: jar},
		BaseURL: dualisMockURL,
	}
	loginInput := LoginInput{
		Appname:   "CampusNet",
		Prgname:   "LOGINCHECK",
		Arguments: "clino,usrname,pass,menuno,menu_type,browser,platform",
		Clino:     "000000000000001",
		Menuno:    "000324",
		Menu_type: "classic",
		Usrname:   "dummy",
		Pass:      "dummy",
		Browser:   "",
		Plattform: "",
	}
	refreshURL, err := app.performLoginAndGetRefreshURL(loginInput)
	if err != nil {
		t.Fatal(err)
	}
	expected := "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=STARTPAGE_DISPATCH&ARGUMENTS=-N680371142374020,-N000019,-N000000000000000"
	if !reflect.DeepEqual(refreshURL, expected) {
		t.Fatal("refreshURLs are not deeqEqual. expected: ", expected, "actual: ", refreshURL)
	}
}

func TestGetGradePageURL(t *testing.T) {
	dualisMockURL := setupDualisMock().URL
	jar, _ := cookiejar.New(nil)

	app := App{
		Client:  &http.Client{Jar: jar},
		BaseURL: dualisMockURL,
	}
	refreshURL := "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=STARTPAGE_DISPATCH&ARGUMENTS=-N680371142374020,-N000019,-N000000000000000"
	gradePageURL, err := app.getGradePageURL(refreshURL)
	if err != nil {
		t.Fatal(err)
	}
	expected := "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=-N168866418179351,-N000307,"
	if !reflect.DeepEqual(gradePageURL, expected) {
		t.Fatal("gradePageURLs are not deeqEqual. expected: ", expected, "actual: ", refreshURL)
	}

}

func TestExtractGradeDetailLinks(t *testing.T) {
	dualisMockURL := setupDualisMock().URL
	jar, _ := cookiejar.New(nil)

	app := App{
		Client:  &http.Client{Jar: jar},
		BaseURL: dualisMockURL,
	}
	gradePageURL := "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=-N168866418179351,-N000307,"
	gradeDetailLinks, err := app.extractGradeDetailLinks(gradePageURL)
	if err != nil {
		t.Fatal(err)
	}
	expected := []string{"/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=RESULTDETAILS&ARGUMENTS=-N999133700060641,-N000307,-N376835200608230"}
	if !reflect.DeepEqual(gradeDetailLinks, expected) {
		t.Fatal("gradePageURLs are not deeqEqual. expected: ", expected, "actual: ", gradeDetailLinks)
	}

}

func TestExtractGrades(t *testing.T) {
	dualisMockURL := setupDualisMock().URL
	jar, _ := cookiejar.New(nil)

	app := App{
		Client:  &http.Client{Jar: jar},
		BaseURL: dualisMockURL,
	}
	gradeDetailLinks := []string{"/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=RESULTDETAILS&ARGUMENTS=-N999133700060641,-N000307,-N376835200608230"}
	_, err := app.extractGrades(gradeDetailLinks)
	if err != nil {
		t.Fatal(err)
	}
	//expected := make([]Course{{Name: "\nW3WI_601 \nMathematik I (WiSe 2020/21)", Examinations: []Examination{{Exam_type: "Klausur (50%)", Grade: "1,0"}, {Exam_type: "Klausur (50%)", Grade: "1,1"}}}})
	//TODO compare expected and grades

}
