CREATE TABLE [dbo].[reconcile_transactions] (
    [id] int IDENTITY,
    [payment_id] varchar(50),
    [ref_id] varchar(50),
    [name] varchar(50),
    [before_status] varchar(50),
    [after_status] varchar(50),
    [log_response] text,
    [created_at] datetime DEFAULT (getdate()),
    [updated_at] datetime DEFAULT (getdate()),
    PRIMARY KEY ([id])
)