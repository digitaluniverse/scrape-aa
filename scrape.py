from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
import time
import re
import webbrowser 
browser = webdriver.Chrome('./chromedriver')
browser.maximize_window()
time.sleep(1)
browser.get('https://www.aa.com/booking/find-flights')
time.sleep(2)
one_way = browser.find_element_by_id('tabOneWay')
redeem = browser.find_element_by_id('awardBooking')

origin = browser.find_element_by_id('segments0.origin')

destination = browser.find_element_by_id('segments0.destination')

depart_date = browser.find_element_by_id('segments0.travelDate')

travel_time = Select(browser.find_element_by_id('segments0.travelTime'))

passenger_count = Select(browser.find_element_by_id('passengerCount'))

search_button = browser.find_element_by_id('flightSearchSubmitBtn')
business_first = Select(browser.find_element_by_id('revenueCabin'))
nearby_airport = browser.find_element_by_xpath('//*[@id="airportSection"]/div[1]/div/div[2]/label')



one_way.click()

origin.clear()

origin.send_keys('SFO')

destination.send_keys('PAR')

depart_date.send_keys('09/28/2021')

travel_time.select_by_value('120001')

passenger_count.select_by_value('2')
# business_first.select_by_value("BUSINESS_FIRST")

# browser.execute_script('arguments[0].click()', redeem)

# browser.execute_script('arguments[0].click()', nearby_airport)
time.sleep(.5)
search_button.click()
browser.implicitly_wait(10)
time.sleep(.5)


try:
    element = WebDriverWait(browser, 40).until(
        # EC.presence_of_element_located((By.ID, "itinerary-qpxc-result-id"))
        EC.presence_of_element_located((By.ID, "showMoreLink"))

    )
except TimeoutException:
    print ("Loading took too much time!")
    browser.quit()

time.sleep(2)

try: 
    showingcount = browser.find_element_by_class_name('showingcount')
    count = showingcount.text
    first = int(re.sub("[^0-9]", "", count[0:count.index('of')]))
    last = int(re.sub("[^0-9]", "", count[count.index('of'):len(count)]))
    btnCount = int(last/first)

    try:
        for i in range(btnCount):
            browser.implicitly_wait(2)
            time.sleep(.1)
            showMoreLink = browser.find_element_by_id('showMoreLink')
            showMoreLink.click()
            showingcount = browser.find_element_by_class_name('showingcount')
            print(showingcount.text)
    except Exception as error:
        pass
except Exception as error:
    print(error)
    pass

# results = browser.find_element_by_class_name('results-desktop').get_attribute("innerHTML")

pageSource = browser.page_source
browser.quit()
print('Generating Scraped Source')

fileToWrite = open("www/public_html/index.html", "w")
fileToWrite.write(pageSource)
fileToWrite.close()
fileToRead = open("www/public_html/index.html", "r")
print(fileToRead.read())
fileToRead.close()

webbrowser.open_new("http://localhost:8080")

