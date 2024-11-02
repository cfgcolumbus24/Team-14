import duckdb

duckdb.sql("SET http_keep_alive = 'false';")

# Load the httpfs extension to enable S3/MinIO support
duckdb.sql("INSTALL httpfs; LOAD httpfs;")

# Configure DuckDB to connect to MinIO
duckdb.sql("""
    SET s3_region = 'us-east-1';  -- Placeholder region, required for compatibility
    SET s3_access_key_id = 'myminioadmin';  -- Your MinIO access key
    SET s3_secret_access_key = 'minio-secret-key-change-me';  -- Your MinIO secret key
    SET s3_endpoint = 'http://localhost:9000';  -- URL of your MinIO server
    SET s3_use_ssl = 'false';  -- Use 'false' because you're using HTTP
""")

# Try a simple query to test connection
try:
    query = """
        SELECT *
        FROM read_csv_auto('s3://testdata/ehr_data.csv')
        LIMIT 5;
    """
    # Execute the query and convert the result to a DataFrame
    result = duckdb.sql(query).df()
    print(result)
except Exception as e:
    print("Error:", e)
