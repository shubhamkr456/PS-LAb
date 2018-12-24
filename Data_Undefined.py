#enter the number of data sets this would be small'Y' values i.e the actual values
#import flask
import numpy as np


print("Answer Below")

#storing data in numpy arrays
busTable = np.empty((0,2), int)
#run the loop for same no. of times
for i in range (0,70):
    rawY= input("Specify the Starting and the Ending Bus with a '-' sign in between and enter 's' to stop\n ")
    if (rawY !='s'):
        appendY= rawY.split('-')
        appendY=list(map(int, appendY))
        busTable = np.append(busTable, np.array([appendY]), axis=0)
    else:
        break
temp= busTable.shape
noOfData=temp[0]
#Now data has been taken
#-------------------------------------------------------------------------------------
#get the maximum of the data for the order of
#capital--Y-- bus matrix

Ybusorder= np.max(busTable)
smallY_Matrix = np.zeros((Ybusorder,Ybusorder),dtype=complex)
capitalY_Matrix = np.zeros((Ybusorder,Ybusorder),dtype=complex)
#get the actual impedance values from the USER
for i in range(0,noOfData):
    #input complex DataSETS
    #extracat the array elements
    tempBus=busTable[i,:]
    print("Enter the Impedance value in ??a+bj?? between {} - {} buses. \n".format(tempBus[0], tempBus[1] ))
    temp=complex(input(""));
    #considering countings starts at zero than 1, hence we subtract
    smallY_Matrix[(tempBus[0]-1),(tempBus[1]-1)] =1/temp

#we have a blank complex __Ybus__ capitalY_Matrix
#starting with the non-diagonal elements
for i in range(0, Ybusorder):

    for j in range(0, Ybusorder):

        while( i!=j and smallY_Matrix[i,j] != 0+0j):

            capitalY_Matrix[i,j]= -smallY_Matrix[i,j]
            if (capitalY_Matrix[i,j] != 0+0j):
                capitalY_Matrix[j,i]=capitalY_Matrix[i,j]

            break

#we have to fill in the diagonal values
for i in range(0, Ybusorder):
    capitalY_Matrix[i,i]=0+0j
    for j in range(0, Ybusorder):
        if(i!=j):
            capitalY_Matrix[i,i]= capitalY_Matrix[i,i]+capitalY_Matrix[i,j]
        else:pass
    capitalY_Matrix[i,i]=-capitalY_Matrix[i,i]

#printing
s= '*'
file = open(“D:\codes\te.txt”,”w”)
file.write("Y Bus By Inspection Method\n")
for i in range(0,200):
    s=s+s;
file.write(s)

for i in range(0, Ybusorder):
    print("\n")
    file.write(s)
    for j in range(0, Ybusorder):
        print("{}||".format(capitalY_Matrix[i,j]))

file.close()

    #Y cap diagonal = sum of small y row and small y column
