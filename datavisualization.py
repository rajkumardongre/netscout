import streamlit as st
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# configuration
st.set_option ('deprecation.showfileUploaderEncoding', False)
# title of the app
st.title("Data Bus Visualization")
# Add a sidebar
st.sidebar.subheader("Visualization Settings")
# Setup file upload
uploaded_file = st.sidebar.file_uploader(label="Upload your CSV or Excel file.",type = ['csv',"xlsx"])
global df
if uploaded_file is not None:
    print (uploaded_file)
    print("hello")
    try:
        df = pd.read_csv (uploaded_file)
    except Exception as e:
        print(e)
        df = pd. read_excel(uploaded_file)
unique_days = st.multiselect("Select the days to plot:", df["Day"].unique())

if len(unique_days) > 0:
    st.set_option('deprecation.showPyplotGlobalUse', False)
    plt.figure(figsize=(10,5))
    for day in unique_days:
        subset = df[df['Day'] == day]
        sns.lineplot(x='time Period', y='People count', data=subset, label=day)
    plt.legend()
    st.pyplot()
else:
    st.warning("Please select at least one day to plot")