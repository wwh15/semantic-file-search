import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
from sentence_transformers import SentenceTransformer
import faiss
# pip install faiss-cpu
import time


def fetch_podcast_info(dataframe_idx):
    # Fetch the row from the dataframe based on the provided index
    info = df.iloc[dataframe_idx]
    
    # Initialize an empty dictionary to store podcast metadata
    meta_dict = dict()
    
    # Retrieve the podcast name and store it in the dictionary
    meta_dict['Name'] = info['Name']
    
    # Retrieve a truncated (up to 500 characters) description and store it in the dictionary
    meta_dict['Description'] = info['Description'][:500]
    
    # Retrieve the rating volume and store it in the dictionary
    meta_dict['Rating_Volume'] = info['Rating_Volume']
    
    # Retrieve the rating and store it in the dictionary
    meta_dict['Rating'] = info['Rating']
    
    # Retrieve the genre and store it in the dictionary
    meta_dict['Genre'] = info['Genre']
    
    # Return the metadata dictionary
    return meta_dict

# Using the updated fetch function in the search_podcast function
def search_podcast(query, top_k, index, model):
    # Record the start time for performance measurement
    t = time.time()
    
    # Encode the user query using the SentenceTransformer model
    query_vector = model.encode([query])
    
    # Search the FAISS index for the top-k most similar podcast descriptions
    top_k = index.search(query_vector, top_k)
    
    # Print the total time taken for the search operation
    print('>>>> Results in Total Time: {}'.format(time.time() - t))
    
    # Extract the indices of the top-k results
    top_k_ids = top_k[1].tolist()[0]
    
    # Ensure the indices are unique (remove duplicates if any)
    top_k_ids = list(np.unique(top_k_ids))
    
    # Fetch the metadata for each of the top-k results using the updated function
    results = [fetch_podcast_info(idx) for idx in top_k_ids]
    
    # Return the list of metadata for the top-k results
    return results

df = pd.read_csv("poddf.csv")

# Load the SentenceTransformer model
model = SentenceTransformer('msmarco-distilbert-base-dot-prod-v3')

# Include the code below the first time running - this is to encode the descriptions into a FAISS file.

'''
# Encode the 'Description' column
encoded_data = model.encode(df.Description.tolist())
encoded_data = np.asarray(encoded_data.astype('float32'))

# Create a FAISS index
index = faiss.IndexIDMap(faiss.IndexFlatIP(768))
index.add_with_ids(encoded_data, np.array(range(0, len(df))))

# Save the index to disk
faiss.write_index(index, 'podcast_description.index')


'''

from pprint import pprint

# read index from FAISS file
index = faiss.read_index('podcast_description.index')

# Search query 
query=" Dinosaurs"

# searches through dataset, top_k is number of searches, and query is search query
results=search_podcast(query, top_k=10, index= index, model=model)


print("\n")

# Result is the dict with Name, Description, Rating_Volume, Rating, and Genre as its keys.
for result in results:
    print('\t',result)

'''
# Calculate the length of each description
df['desc_len'] = df['Description'].apply(lambda words: len(words.split()))

# Calculate the max sequence length
max_seq_len = np.round(df['desc_len'].mean() + df['desc_len'].std()).astype(int)

# Plot the distribution of description lengths
sns.distplot(df['desc_len'], hist=True, kde=True, color='b', label='desc len')
plt.axvline(x=max_seq_len, color='k', linestyle='--', label='max len')
plt.title('Description length'); plt.legend()
plt.show()

'''
